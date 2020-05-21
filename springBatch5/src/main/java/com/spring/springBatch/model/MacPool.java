package com.spring.springBatch.model;

import javax.crypto.Mac;
import java.util.LinkedList;

/**
 * The Class MacPool.
 */
public class MacPool {

	private LinkedList<Mac> avlbMacs;

	private int maxSize = 10;
	private int currentSize;

	/**
	 * Instantiates a new MAC pool.
	 *
	 * @param maxSize the max size
	 */
	public MacPool(int maxSize) {
		this.currentSize = 0;
		if (maxSize > 0) {
			this.maxSize = maxSize;
		}
		this.avlbMacs = new LinkedList<>();
	}

	/**
	 * Seize MAC.
	 *
	 * @return the mac
	 */
	public synchronized Mac seizeMac() {
		Mac mac = avlbMacs.poll();
		if (mac == null) {
			currentSize = 0;
		} else {
			currentSize--;
		}
		return mac;
	}

	/**
	 * Offer MAC.
	 *
	 * @param mac the mac
	 */
	public synchronized void offerMac(Mac mac) {
		if (currentSize < maxSize) {
			currentSize++;
			avlbMacs.offer(mac);
		}
	}
}