package com.javatpoint;

import org.springframework.beans.factory.annotation.Autowired;

public class TextEditor {

	@Autowired
	private SpellChecker spellChecker;  

	
	public SpellChecker getSpellChecker() {
		return spellChecker;
	}

	public void setSpellChecker(SpellChecker spellChecker) {
		this.spellChecker = spellChecker;
	}


	public void spellCheck() 
	{
		System.out.println("inside text editor");
		spellChecker.checkSpelling();
	}
}
