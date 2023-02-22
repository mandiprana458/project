import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class ValidatorsModule {

    validStringData = (name, data) => {
        if (!data || data == null || data == "") {
            throw `${name} is required. Please enter a valid ${name}`;
        }
    };

    requiredData = (name, data) => {
        if (!data || data == null) {
            throw `${name} is required. Please enter a valid ${name}`;
        }
    };

    validNumber = (name, data) => {
        if (isNaN(data)) {
            throw `${name} is not a valid number`;
        }
    };

    validMemberStatus = (name, data) => {
        // 2: active, 3: inactive, 4: unknown, 5: draft
        if (data != 2 && data != 3 && data != 4 && data != 5) {
            throw `${name} is not a valid.`;
        }
    };

    validMonth = (name, data) => {
       let months = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"]
        if (!months.includes(data)) {
            throw `${name} is not a valid month.`;
        }
    };

    validAMPM = (name, data) => {
        // 2: active, 3: inactive, 4: unknown, 5: draft
        if (data != "AM" && data != "PM" && data != "am" && data != "pm") {
            throw `${name} is not valid. Can be AM or PM`;
        }
    };

    notEmpty = (name, data) => {
        if (!data || data == null || data == '' || data.trim() == '') {
            throw `${name} is empty. Please provide a valid ${name}`;
        }
    };

    validPhoneNumber = (name, number) => {
        this.validNumber(name, number)
        // validNumber(name, number)
        let numTenRegex = /^[1]\d{10}$/;
        let numElevenRegex = /^[123456789]\d{9}$/;
        let valid = numTenRegex.test(number) || numElevenRegex.test(number);
        if (!valid) {
            throw `${name} is invalid. Please enter a valid ${name}`;
        }

    };

    validBoolean = (name, data) => {
        console.log(data)
        if (typeof data != "boolean") {
            // variable is not boolean
            throw `${name} is invalid. Please enter a valid ${name}`;
        }
    };

    validGender = (name, data) => {
        if (data != 'M' && data != 'F') {
            throw `${name} is not a valid gender.`;
        }
    };

    validRelation = (name, data) => {
        if (data != 'FATHER' && data != 'HUSBAND') {
            throw `${name} is not a valid relation. Can be either FATHER or HUSBAND`;
        }
    };

    validEmail = (name, email) => {
        this.validStringData(name, email)
        let emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let valid = emailRegex.test(String(email).toLowerCase());
        if (!valid) {
            throw `${name} is invalid. Please enter a valid ${name}`;
        }
    };

    validIfPresentEmail = (name, email) => {
        if (email && email != null) {
            let emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            let valid = emailRegex.test(String(email).toLowerCase());
            if (!valid) {
                throw `${name} is invalid. Please enter a valid ${name}`;
            }
        }
    };

    validState = (name, data) => {
        this.validStringData(name, data)
    };

    validDistrict = (name, data) => {
        this.validStringData(name, data)
    };

    validDOB = (name, data) => {
        try {
            let todate = new Date().getTime()
            if (data >= todate) {
                throw `${name} is invalid. Date of birth cannot be greater than current date.`;
            }
        } catch (error) {
            throw error
        }
    };

    validUserRole = (name, role) => {
        this.validStringData(name, role)

        if (!['USER', 'ADMIN', 'CSA'].includes(role)) {
            throw `${name} is invalid. You can choose either of the three roles: ADMIN, USER, CSA`;
        }
        return true
    };

    validPaymentFrequency = (name, subscriptionFrequency) => {
        this.validStringData(name, subscriptionFrequency)
        subscriptionFrequency = subscriptionFrequency.toUpperCase()
        if (!['YEARLY', 'MONTHLY', 'WEEKLY'].includes(subscriptionFrequency)) {
            throw `${name} is invalid. You can choose either of the three frequencies: YEARLY, MONTHLY, WEEKLY`;
        }
        return true
    };

    validOrganisationType = (name, organisationType) => {
        this.validStringData(name, organisationType)
        organisationType = organisationType.toUpperCase()
        if (!['K12', 'TRANSPORTATION', 'HIGHER EDUCATION'].includes(organisationType)) {
            throw `${name} is invalid. You can choose either of the three types: K12, TRANSPORTATION, HIGHER EDUCATION`;
        }
        return true
    };

    validPassword = (name, password) => {
        this.validStringData(name, password)
        let strongPwdRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        if (!strongPwdRegex.test(password)) {
            throw `${name} is invalid. Your password must be atleast 8 characters long, with one upper case,lower case character, one number and a special character.`;
        }
    };

    validateUpdater = (updaterRole, updatedRole, updatorDistrict, updateUserDistrict, updateData, updatorState, updatedUserState) => {
        if ((updaterRole == 'DISTRICT ADMIN' && (updatedRole == 'DISTRICT ADMIN' || updatedRole == 'SUPER ADMIN' || updatedRole == 'STATE ADMIN')) || (updaterRole == 'FIELD WORKER')) {
            return false;
        }
        if (updaterRole == 'STATE ADMIN' && (updatedRole == 'SUPER ADMIN' || updatedRole == 'STATE ADMIN')) {
            return false;
        }
        if (updaterRole == 'STATE ADMIN' && (updatorState != updatedUserState)) {
            return false;
        }
        if ((updaterRole == 'DISTRICT ADMIN') && (updatorDistrict != updateUserDistrict)) {
            return false;
        }
        if (updateData.manageBlocks && (updaterRole == 'DISTRICT ADMIN' || updaterRole == 'FIELD WORKER' || updatedRole != 'DISTRICT ADMIN')) {
            return false;
        }
        // need to add a check that state admin only approves his state das
        return true;
    };

    validateBlocks = (name, blocks) => {
        let validBlocks = [];
        if (!blocks || !Array.isArray(blocks)) {
            throw `${name} format is invalid. Please upload blocks as array of strings.`;
            return
        }
        blocks.forEach((block) => {
            if (block && block != null && block.trim() != "" && isNaN(block)) {
                validBlocks.push(block);
            }
        })
        return validBlocks;
    };

    validateMembers = (name, memberIds) => {
        let validIds = [];
        if (!memberIds || !Array.isArray(memberIds)) {
            throw `${name} format is invalid. Please select members.`;
            return
        }
        memberIds.forEach((id) => {
            if (id && id != null && !isNaN(id)) {
                validIds.push(id);
            }
        })
        return validIds;
    };

    validPinType = (name, data) => {
        try {
            if (isNaN(data) && data.toLowerCase() != "unknown") {
                throw `${name} is invalid. Please enter a valid ${name}`;
            }
        } catch (error) {
            throw error
        }
    };

    validVerificationCode = (name, data) => {
        try {
            if (isNaN(data) || data.toString().length != 6) {
                throw `${name} is invalid. Please enter a valid ${name}`;
            }
        } catch (error) {
            throw error
        }
    };

    validConfirmPassword = (newPwd, confirmPassword) => {
        try {
            if (newPwd != confirmPassword) {
                throw `New password and confirm password do not match. Please try again.`;
            }
        } catch (error) {
            throw error
        }
    };

    validLocalityType = (name, data) => {
        if (data != 'ward' && data != 'village' && data != 'area') {
            throw `${name} is not a valid locality type. Can be either ward or village or area`;
        }
    };



    //  validators = {
    //     validVerificationCode,
    //     validConfirmPassword,
    //     validPassword,
    //     validDistrict,
    //     validEmail,
    //     validPhoneNumber,
    //     validState,
    //     validUserRole,
    //     validStringData,
    //     validBoolean,
    //     validateUpdater,
    //     validNumber,
    //     notEmpty,
    //     validateBlocks,
    //     requiredData,
    //     validMemberStatus,
    //     validIfPresentEmail,
    //     validateMembers,
    //     validPinType,
    //     validGender,
    //     validRelation,
    //     validLocalityType,
    //     validPaymentFrequency,
    //     validOrganisationType,
    //     validDOB,
    //     validAMPM,
    //     validMonth
    // };
}

