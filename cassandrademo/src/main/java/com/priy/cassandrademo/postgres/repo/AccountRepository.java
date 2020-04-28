package com.priy.cassandrademo.postgres.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.priy.cassandrademo.postgres.model.AccountEntity;

public interface AccountRepository extends JpaRepository<AccountEntity, Integer>{

}
