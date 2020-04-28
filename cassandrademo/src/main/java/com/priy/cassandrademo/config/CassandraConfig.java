package com.priy.cassandrademo.config;

import java.util.Collections;
import java.util.List;

import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.cassandra.config.AbstractCassandraConfiguration;
import org.springframework.data.cassandra.config.CassandraClusterFactoryBean;
import org.springframework.data.cassandra.config.CassandraSessionFactoryBean;
import org.springframework.data.cassandra.config.SchemaAction;
import org.springframework.data.cassandra.core.CassandraOperations;
import org.springframework.data.cassandra.core.CassandraTemplate;
import org.springframework.data.cassandra.core.convert.CassandraConverter;
import org.springframework.data.cassandra.core.convert.MappingCassandraConverter;
import org.springframework.data.cassandra.core.cql.CqlIdentifier;
import org.springframework.data.cassandra.core.cql.keyspace.CreateKeyspaceSpecification;
import org.springframework.data.cassandra.core.cql.keyspace.KeyspaceOption;
import org.springframework.data.cassandra.core.mapping.BasicCassandraMappingContext;
import org.springframework.data.cassandra.core.mapping.CassandraMappingContext;
import org.springframework.data.cassandra.core.mapping.SimpleUserTypeResolver;
import org.springframework.data.cassandra.core.mapping.UserTypeResolver;
import org.springframework.data.cassandra.repository.config.EnableCassandraRepositories;

import com.datastax.driver.core.Cluster;


@Configuration
@EntityScan("com.priy.cassandrademo.model")
@EnableCassandraRepositories(
		  basePackages = "com.priy.cassandrademo.repository")
public class CassandraConfig extends AbstractCassandraConfiguration {
	 
    @Override
    protected String getKeyspaceName() {
        return "demo";
    }
 
    @Bean
    public CassandraClusterFactoryBean cluster() {
        CassandraClusterFactoryBean cluster = 
          new CassandraClusterFactoryBean();
        cluster.setContactPoints("127.0.0.1");
        cluster.setPort(9042);
        cluster.setUsername("cassandra");
        cluster.setPassword("cassandra");
        cluster.setJmxReportingEnabled(false);

        return cluster;
    }
    
    @Bean
    public CassandraMappingContext mappingContext() {
        BasicCassandraMappingContext mappingContext = new BasicCassandraMappingContext();
        mappingContext.setUserTypeResolver(new SimpleUserTypeResolver(cluster().getObject(), "demo"));
        return mappingContext;
    }
    
    @Override
  public SchemaAction getSchemaAction() {
      return SchemaAction.RECREATE;
  }

    @Bean
    public CassandraConverter converter() {
        return new MappingCassandraConverter(mappingContext());
    }

    @Bean
    public CassandraSessionFactoryBean session() {

        CassandraSessionFactoryBean session = new CassandraSessionFactoryBean();
        session.setCluster(cluster().getObject());
        session.setKeyspaceName("demo");
        session.setConverter(converter());
        session.setSchemaAction(SchemaAction.CREATE_IF_NOT_EXISTS);

        return session;
    }

//    @Bean
//    public CassandraOperations cassandraTemplate() throws Exception {
//        return new CassandraTemplate(session().getObject());
//    }
    
    
 
//    @Bean
//    public CassandraMappingContext cassandraMapping() 
//      throws ClassNotFoundException {
//        return new BasicCassandraMappingContext();
//    }
//    
//    @Bean 
//    public CassandraMappingContext mappingContext() throws Exception { 
//        BasicCassandraMappingContext mappingContext = new BasicCassandraMappingContext(); 
//        mappingContext.setUserTypeResolver(new SimpleUserTypeResolver(cluster().getObject(), "demo")); 
//        return mappingContext; 
//    }
//    
//    
//    @Override
//    public SchemaAction getSchemaAction() {
//        return SchemaAction.CREATE_IF_NOT_EXISTS;
//    }
//    
//    @Override
//    public String[] getEntityBasePackages() {
//        return new String[]{"com.priy.cassandrademo.model"};
//    }
//    
//    @Override
//    protected List<CreateKeyspaceSpecification> getKeyspaceCreations() {
//        return Collections.singletonList(CreateKeyspaceSpecification
//                .createKeyspace("demo")
//                .ifNotExists(true)
//                .with(KeyspaceOption.DURABLE_WRITES, true)
//                .withSimpleReplication());
//    }


}
