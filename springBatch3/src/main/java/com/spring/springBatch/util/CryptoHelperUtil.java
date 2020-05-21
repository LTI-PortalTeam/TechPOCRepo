package com.spring.springBatch.util;

import java.security.NoSuchAlgorithmException;

import javax.crypto.Cipher;
import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;

import org.bouncycastle.util.encoders.Base64;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.spring.springBatch.model.CipherPool;
import com.spring.springBatch.model.MacPool;

// TODO: Auto-generated Javadoc
/**
 * The Class CryptoHelperUtil.
 */
public class CryptoHelperUtil {

	private static final Logger LOGGER = LoggerFactory.getLogger(CryptoHelperUtil.class);
	private static KeyGenerator KEYGEN;
	private static CipherPool CIPHER_POOL = new CipherPool(100);
	private static MacPool MAC_POOL = new MacPool(100);

	static {
		try {
			KEYGEN = KeyGenerator.getInstance(Constants.AES_ALGORITHM);
			KEYGEN.init(Constants.ENC_BITS);
		} catch (NoSuchAlgorithmException e) {
			LOGGER.error("Exception ", e);
			LOGGER.error("Error in init Variables {} at {}", e, System.currentTimeMillis());
		}
	}

	/**
	 * Instantiates a new crypto helper util.
	 */
	private CryptoHelperUtil() {
	}

	/**
	 * Gets the cipher.
	 *
	 * @param key the key
	 * @param mode the mode
	 * @return the cipher
	 * @throws Exception the exception
	 */
	private static Cipher getCipher(String key, int mode) throws Exception {
		Cipher cipher = null;
		try {
			LOGGER.info("Entering getCipher {}", System.currentTimeMillis());
			cipher = CIPHER_POOL.seizeCipher();
			if(cipher == null)	{
				cipher = Cipher.getInstance(Constants.AES_TRANSFORMATION);
			}
			cipher.init(mode, new SecretKeySpec(decodeBase64StringTOByte(key), Constants.AES_ALGORITHM));
		} catch(Exception e) {
			if (cipher != null)	{
				CIPHER_POOL.offerCipher(cipher);
			}
			throw e;
		}
		finally {
			LOGGER.info("Exiting getCipher {}", System.currentTimeMillis());
		}
		return cipher;
	}
	/**
	 * *
	 * This is used to encode Base64 String to String format of UTF8.
	 *
	 * @param stringData  String to encode
	 * @return encoded String
	 * @throws Exception the exception
	 */
	public static String encodeBase64String(String stringData) throws Exception {
		return new String(java.util.Base64.getEncoder().encode(stringData.getBytes(Constants.CHARACTER_ENCODING)));
	}

	/**
	 * This method is used to enocde bytes[] to base64 string.
	 * 
	 * @param bytes  Bytes to encode
	 * @return Encoded Base64 String
	 */
	public static String encodeBase64String(byte[] bytes) {
		return new String(java.util.Base64.getEncoder().encode(bytes));
	}

	/**
	 * This method is used to decode the encoded string to string.
	 *
	 * @param stringData String to decode
	 * @retur decoded String
	 * @throws Exception the exception
	 */
	public static String decodeBase64String(String stringData) throws Exception {
		return new String(java.util.Base64.getDecoder().decode(stringData.getBytes(Constants.CHARACTER_ENCODING)));
	}

		/**
	 * This method is used to generate the base64 encoded seucre key which will
	 * be used as ek .
	 *
	 * @return base64 encoded secure Key
	 * @throws Exception the exception
	 */
	public static String generateSecureKey() throws Exception {
		LOGGER.info("Entering generateSecureKey {}", System.currentTimeMillis());
		SecretKey secretKey = KEYGEN.generateKey();
		LOGGER.info("Exiting generateSecureKey {}", System.currentTimeMillis());
		return encodeBase64String(secretKey.getEncoded());
	}

	/**
	 * This method is used to encrypt the string which passed to it.
	 *
	 * @param plainText Text to encrypt
	 * @param secret  Key using for encrypt
	 * @return base64 encoded of encrypted string.
	 * @throws Exception the exception
	 */
	public static String encrypt(String plainText, String secret) throws Exception {
		LOGGER.info("Entering encryptAES of String {}", System.currentTimeMillis());
		Cipher encryptCipher = getCipher(secret, Cipher.ENCRYPT_MODE);
		
		try {
			return Base64.toBase64String(encryptCipher.doFinal(plainText.getBytes(Constants.CHARACTER_ENCODING)));
		}
		finally {
			CIPHER_POOL.offerCipher(encryptCipher);
			LOGGER.info("Exiting encryptAES of String {}", System.currentTimeMillis());
		}
	}


	/**
	 * This method will take base64 Encoded String and return base64 decoded
	 * byte.
	 *
	 * @param stringData  Base64 Encoded String.
	 * @return  Base64 decoded byte[].
	 * @throws Exception the exception
	 */
	private static byte[] decodeBase64StringTOByte(String stringData) throws Exception {
		return java.util.Base64.getDecoder().decode(stringData.getBytes(Constants.CHARACTER_ENCODING));
	}

}
