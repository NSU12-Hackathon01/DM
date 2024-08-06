package com.example.dm_be.oauth;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class KakaoUserDTO {
    @JsonProperty("id")
    private Long id;

    @JsonProperty("connected_at")
    private String connectedAt;

    @JsonProperty("kakao_account")
    private KakaoAccount kakaoAccount;

    @Data
    public static class KakaoAccount {
        @JsonProperty("name_needs_agreement")
        private Boolean nameNeedsAgreement;

        @JsonProperty("name")
        private String name;

        @JsonProperty("has_email")
        private Boolean hasEmail;

        @JsonProperty("email_needs_agreement")
        private Boolean emailNeedsAgreement;

        @JsonProperty("is_email_valid")
        private Boolean isEmailValid;

        @JsonProperty("is_email_verified")
        private Boolean isEmailVerified;

        @JsonProperty("email")
        private String email;

        @JsonProperty("has_phone_number")
        private Boolean hasPhoneNumber;

        @JsonProperty("phone_number_needs_agreement")
        private Boolean phoneNumberNeedsAgreement;

        @JsonProperty("phone_number")
        private String phoneNumber;

        @JsonProperty("has_birthday")
        private Boolean hasBirthday;

        @JsonProperty("birthday_needs_agreement")
        private Boolean birthdayNeedsAgreement;

        @JsonProperty("birthday")
        private String birthday;

        @JsonProperty("birthday_type")
        private String birthdayType;

        @JsonProperty("has_birthyear")
        private Boolean hasBirthyear;

        @JsonProperty("birthyear_needs_agreement")
        private Boolean birthyearNeedsAgreement;

        @JsonProperty("birthyear")
        private String birthyear;

        @JsonProperty("birthyear_type")
        private String birthyearType;

        @JsonProperty("has_gender")
        private Boolean hasGender;

        @JsonProperty("gender_needs_agreement")
        private Boolean genderNeedsAgreement;

        @JsonProperty("gender")
        private String gender;
    }
}
