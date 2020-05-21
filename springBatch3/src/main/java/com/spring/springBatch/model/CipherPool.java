package com.spring.springBatch.model;

import java.util.LinkedList;

import javax.crypto.Cipher;

/**
 * The Class CipherPool.
 */
public class CipherPool {

	private LinkedList<Cipher> avlbCiphers;

	private int maxSize = 10;
	private int currentSize;

	/**
	 * Instantiates a new cipher pool.
	 *
	 * @param maxSize the max size
	 */
	public CipherPool(int maxSize) {
		this.currentSize = 0;
		if (maxSize > 0) {
			this.maxSize = maxSize;
		}
		this.avlbCiphers = new LinkedList<>();
	}

	/**
	 * Seize cipher.
	 *
	 * @return the cipher
	 */
	public synchronized Cipher seizeCipher() {
		Cipher cipher = avlbCiphers.poll();
		if (cipher == null) {
			currentSize = 0;
		} else {
			currentSize--;
		}
		return cipher;
	}

	/**
	 * Offer cipher.
	 *
	 * @param cipher the cipher
	 */
	public synchronized void offerCipher(Cipher cipher) {
		if (currentSize < maxSize) {
			currentSize++;
			avlbCiphers.offer(cipher);
		}
	}
}