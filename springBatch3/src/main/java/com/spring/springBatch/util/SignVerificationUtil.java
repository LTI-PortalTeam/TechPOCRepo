package com.spring.springBatch.util;

import java.io.File;
import java.io.FileInputStream;
import java.security.KeyStore;
import java.security.PrivateKey;
import java.security.Security;
import java.security.cert.Certificate;
import java.security.cert.X509Certificate;
import java.util.ArrayList;
import java.util.List;

import org.bouncycastle.cert.X509CertificateHolder;
import org.bouncycastle.cert.jcajce.JcaCertStore;
import org.bouncycastle.cms.CMSProcessable;
import org.bouncycastle.cms.CMSProcessableByteArray;
import org.bouncycastle.cms.CMSSignedData;
import org.bouncycastle.cms.CMSSignedDataGenerator;
import org.bouncycastle.cms.CMSTypedData;
import org.bouncycastle.cms.jcajce.JcaSignerInfoGeneratorBuilder;
import org.bouncycastle.jce.provider.BouncyCastleProvider;
import org.bouncycastle.operator.ContentSigner;
import org.bouncycastle.operator.jcajce.JcaContentSignerBuilder;
import org.bouncycastle.operator.jcajce.JcaDigestCalculatorProviderBuilder;
import org.bouncycastle.util.encoders.Base64;

/**
 * @Class SignVerificationUtil This class verifies the signed data received from
 *        controller and returns true or false after verification
 */
public class SignVerificationUtil {

	private static final String BC = "BC";
	private static final String UTF8 = "UTF8";
	private static final String PFX_FILE_PATH = "/opt/soft/secret";
	private static final String AMP = "&";
	private static final String EQUAL = "=";
	
	private SignVerificationUtil() {
	}

	static {
		Security.addProvider(new BouncyCastleProvider());
	}

	
	public static String generateSign(String encodedData) throws Exception {
 		File pfxFile = null;
 		String pfxName = "";
 		String pfxCred = "";
 		String pfxType = "";
 		String alias = "";
 		Certificate[] certChain = null;
 		List<Certificate> certList = null;
 		JcaCertStore certStore = null;
 		PrivateKey privKey = null;
 		X509Certificate certificate = null;
 		try {
 			Security.addProvider(new BouncyCastleProvider());		
 			pfxFile = new File("D:/DC1GSTNEMUDHRA/gstsigner-emudhra.pfx");
 			pfxType = "PKCS12";
 			pfxCred = "G$t123dsc";
 			alias = "le-9a9592a7-353b-49ff-86ad-0fa80bcc43da";
 			KeyStore keyStore = KeyStore.getInstance(pfxType,BC);
 			keyStore.load(new FileInputStream(pfxFile), pfxCred.toCharArray());
 			certChain = keyStore.getCertificateChain(alias);
 			certList = new ArrayList<>();
 			for (int i = 0; i < certChain.length; i++)
 				certList.add(certChain[i]);
 			certStore = new JcaCertStore(certList);
 			KeyStore.PrivateKeyEntry entry = (KeyStore.PrivateKeyEntry) keyStore
 					.getEntry(alias, new KeyStore.PasswordProtection(
 							pfxCred.toCharArray()));
 			privKey = entry.getPrivateKey();
 			certificate = (X509Certificate) keyStore.getCertificate(alias);
 			//System.out.println(certificate);
 			X509CertificateHolder certificateHolder = new X509CertificateHolder(
 					certificate.getEncoded());
 			CMSSignedDataGenerator cmsSignedDataGenerator = new CMSSignedDataGenerator();
 			ContentSigner sha1Signer = new JcaContentSignerBuilder(
 					"SHA256withRSA").setProvider("BC").build(privKey);
 			cmsSignedDataGenerator
 					.addSignerInfoGenerator(new JcaSignerInfoGeneratorBuilder(
 							new JcaDigestCalculatorProviderBuilder()
 									.setProvider("BC").build()).build(
 											sha1Signer, certificateHolder));
 			cmsSignedDataGenerator.addCertificates(certStore);
 			CMSProcessable cmsProcessable = new CMSProcessableByteArray(
 					encodedData.getBytes());
 			CMSSignedData sigData = cmsSignedDataGenerator
 					.generate((CMSTypedData) cmsProcessable, false);

 			return Base64.toBase64String(sigData.getEncoded());
 		} catch (Exception e) {
 			System.out.println("Exception in generateSign {}"+ e);
 			return null;
 		} finally {
 			System.out.println("Exit generateSign at {} "+ System.currentTimeMillis());
 		}
 	}
	
}
