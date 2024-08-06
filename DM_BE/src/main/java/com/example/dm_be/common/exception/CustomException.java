package com.example.dm_be.common.exception;

import com.example.dm_be.common.ErrorCode;
import lombok.Getter;

@Getter
public class CustomException extends RuntimeException{

    private ErrorCode errorCode;

    public CustomException(ErrorCode errorCode){
        this.errorCode = errorCode;
    }

}
