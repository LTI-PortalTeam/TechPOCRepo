package com.sandeep.redis.util;

import java.io.IOException;
import java.util.LinkedHashSet;
import java.util.Map;
import java.util.Random;
import java.util.Set;

import org.apache.commons.pool2.impl.GenericObjectPoolConfig;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import redis.clients.jedis.HostAndPort;
import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisCluster;
import redis.clients.jedis.JedisPool;
import redis.clients.jedis.exceptions.JedisException;

@Component
public class RedisTester {

	private final Logger LOGGER = LoggerFactory.getLogger(this.getClass());
	
	private static final int MAX_RETRIES = 10;
	private static final long INITIAL_WAIT = 500L;
	private static final long BACKUP_FACTOR = 2L;
	
	@Value("${redisClusterString}")
	private String redisClusterString;

	@Value("${minKey}")
	private int minKey;
	@Value("${maxKey}")
	private int maxKey;
	@Value("${loops}")
	private int loops;

	private int found = 0;
	private int notFound = 0;
	private long writeDuration = 0L;
	private long readDuration = 0L;
	
	public String getRedisClusterString() {
		return redisClusterString;
	}
	
	public JedisCluster getRedisCluster() {
		
		/* Check if we have set hosts in the configuration */
		if (redisClusterString == null || redisClusterString.isEmpty()) {
			LOGGER.error("Redis cluster hosts are not set");
			return null;
		}
		
		LOGGER.info("Creating Redis cluster connection with hosts: {}", redisClusterString);
		
		GenericObjectPoolConfig config = new GenericObjectPoolConfig<>();
		config.setMaxTotal(30);
		config.setMaxWaitMillis(2000);
		
		Set<HostAndPort> jedisClusterNodes = new LinkedHashSet<>();
		for (String hostName : redisClusterString.split(",[ ]*")) {
			String[] readHostParts = hostName.split(":");
			if ((readHostParts.length != 2) || !(readHostParts[1].matches("\\d+"))) {
				LOGGER.error("Invalid host name set for redis cluster: {}", hostName);
				continue;
			}
			
			LOGGER.info("Adding host {}:{}", readHostParts[0], readHostParts[1]);
			jedisClusterNodes.add(new HostAndPort(readHostParts[0], Integer.parseInt(readHostParts[1])));
		}
			
			JedisCluster jedisCluster = new JedisCluster(jedisClusterNodes, 2000, 2000, 5, config);
			Map<String, JedisPool> cNodes = jedisCluster.getClusterNodes();
			
			LOGGER.info("Jedis cluster connection created:");
			for(String nodeName: cNodes.keySet()) {
				LOGGER.info("node: {}", nodeName);
				Jedis jedis = cNodes.get(nodeName).getResource();
				LOGGER.debug("Server Info: {}", jedis.info());
			}
			return jedisCluster;
			
		}
		
		public void runTest() {
			LOGGER.info("Starting test ...");
			LOGGER.info("Establishing connection to Redis Cluster at {}", this.redisClusterString);
			LOGGER.info("Generating {} randmon KV-pairs with minKey={} and maxKey={} and writing it to our Redis Cluster", loops, minKey, maxKey);
			JedisCluster jCluster = this.getRedisCluster();
			this.writeKeys(jCluster);
			// waiting a bit before attempting to read back allowing us to better react
			LOGGER.info("=========================> Waiting 10 seconds before reading back...");
			try {
				Thread.sleep(10000L);
			} catch (InterruptedException e1) {
				// just ignore this
			}
			this.readKeys(jCluster);
			LOGGER.info("Writing of {} KV-pairs took {}ms, reading them back took {}ms.", maxKey, writeDuration, readDuration);
			LOGGER.info("Attempting to read KV-pairs again...");
			// waiting a bit before attempting to read back allowing us to better react
			LOGGER.info("=========================> Waiting 10 seconds before reading back...");
			try {
				Thread.sleep(10000L);
			} catch (InterruptedException e1) {
				// just ignore this
			}
			this.readKeys(jCluster);
			LOGGER.info("Reading {} KV-pairs again took {}ms", loops, readDuration);
			LOGGER.info("Out of {} keys a total of {} were found and {} could not be found {}", ((maxKey - minKey) + 1), found, notFound);
			LOGGER.info("Closing connection to Redis now...");
			try {
				jCluster.close();
			} catch (Exception e) {
				LOGGER.error("Exception while trying to close connection to Redis Cluster: ", e);
			}
			LOGGER.info("...closed");
			LOGGER.info("Existing");
		}

		private void writeKeys(JedisCluster jCluster) {
			RandomString rndStr = new RandomString(100);
			Random rnd = new Random();
			int bound = maxKey - minKey + 1;
			LOGGER.info("writing key-values ...");
			long start = System.currentTimeMillis();
			for (int i = minKey; i < maxKey; i++) {
				String key = String.valueOf(i);
				String value = rndStr.nextString();
				// the following retry logic should actually be put into a separate method.
				// TODO will do this eventually
				int retries = 0;
				long wait = 0L;
				boolean failed;
				boolean wasFailed = false;
				do {
					failed = false;
					try {
						//LOGGER.info("Writing key:value pair {} : {}",key,value );
						jCluster.set(key, value);
					} catch (JedisException jex) {
						String exceptionName = jex.getClass().getName();
						LOGGER.info("SET operation failed with exception {}...", exceptionName);
						wasFailed = true;
						// we were not able to write. Mark this as failed so we can retry
						// first close our current connection so we can refresh the cluster config
						/*
						try {
							LOGGER.info("Closing current connection to refresh cluster info...");
							jCluster.close();
						} catch (IOException e1) {
							// we just log this and continue
							LOGGER.info("Exception while attempting to close failed connection: ", e1);
						}
						*/
						failed = true;
						retries++;
						if (retries >= MAX_RETRIES) {
							// too much - we are giving up
							LOGGER.error("Too much retries giving up because of exception: ", jex);
							throw jex;						
						}
						if(wait == 0L) {
							wait = INITIAL_WAIT;
						} else {
							wait *= BACKUP_FACTOR;
						}
						LOGGER.error("SET operation failed with exception. Attempting retry {} with a wait of {}ms...", retries, wait);
						try {
							Thread.sleep(wait);
						} catch (InterruptedException e) {
							// we can safely ignore this here
						}
					}
				} while(failed);
				if(wasFailed) {
					wasFailed = false;
					LOGGER.info("Writing to failed Redis cluster resumed after {} retries!", retries);
				}
				/*
				if((i+1) % 100 == 0) {
					LOGGER.info("{} KVs written", i);
				}
				*/
			}
			this.writeDuration = System.currentTimeMillis() - start;
			LOGGER.info("... done!");		
		}
		
		private void readKeys(JedisCluster jCluster) {
			LOGGER.info("Reading back KV-pairs ...");
			long start = System.currentTimeMillis();
			for (int i = minKey; i <= maxKey; i++) {
				String key = String.valueOf(i);
				// the following retry logic should actually be put into a separate method.
				// TODO will do this eventually
				int retries = 0;
				long wait = 0L;
				boolean failed;
				boolean wasFailed = false;
				String value = null;
				do {
					failed = false;
					try {
						value = jCluster.get(key);
						//LOGGER.info("Reading key:value pair {} : {}",key,value );
					} catch (JedisException jex) {
						String exceptionName = jex.getClass().getName();
						LOGGER.info("SET operation failed with exception {}...", exceptionName);
						wasFailed = true;
						// we were not able to read. Mark this as failed so we can retry
						// first close our current connection so we can refresh the cluster config
						/*
						try {
							LOGGER.info("Closing current connection to refresh cluster info...");
							jCluster.close();
						} catch (IOException e1) {
							// we just log this and continue
							LOGGER.info("Exception while attempting to close failed connection: ", e1);
						}
						*/
						failed = true;
						retries++;
						if (retries >= MAX_RETRIES) {
							// too much - we are giving up
							LOGGER.error("Too much retries giving up because of exception: ", jex);
							throw jex;						
						}
						if(wait == 0L) {
							wait = INITIAL_WAIT;
						} else {
							wait *= BACKUP_FACTOR;
						}
						LOGGER.error("GET operation failed with exception. Attempting retry {} with a wait of {}ms...", retries, wait);
						try {
							Thread.sleep(wait);
						} catch (InterruptedException e) {
							// we can safely ignore this here
						}
					}
				} while(failed);
				if(wasFailed) {
					wasFailed = false;
					LOGGER.info("Reading from failed Redis cluster resumed after {} retries!", retries);
				}
				if(value == null) {
					notFound++;
				} else {
					found++;
				}
			}
			this.readDuration = System.currentTimeMillis() - start;
			LOGGER.info("... done!");		
		}
}
