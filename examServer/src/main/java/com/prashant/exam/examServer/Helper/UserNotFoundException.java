package com.prashant.exam.examServer.Helper;

public class UserNotFoundException extends Exception {

    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public UserNotFoundException() {
        super("User with this username not found in database !!");
    }

    public UserNotFoundException(String msg) {
        super(msg);
    }

	public void printStackTrace() {
		// TODO Auto-generated method stub
		
	}
}

