import { Injectable } from '@angular/core';
import { HelperService } from 'src/core/services/helper/helper.service';
import { ValidatorsModule } from '../validators.module';

@Injectable({
    providedIn: 'root'
})
export class ValidatorService {

    constructor(public helperService: HelperService, public validator: ValidatorsModule) { }

    createK12ReportValidations = (payloadData) => {
        try {

            let validated = false

            // validator.validNumber('Incident Date', payloadData.incidentDate)
            this.validator.validNumber('Incident Day', payloadData.incidentDay)
            this.validator.validStringData('Incident Month', payloadData.incidentMonth)
            this.validator.validMonth('Incident Month', payloadData.incidentMonth)
            this.validator.validNumber('Incident Year', payloadData.incidentYear)
            this.validator.validNumber('Incident Hours', payloadData.incidentHours)
            this.validator.validNumber('Incident Minutes', payloadData.incidentMinutes)
            this.validator.validAMPM('AM / PM', payloadData.amPm)
            this.validator.validStringData('Incident Address', payloadData.incidentAddress)
            this.validator.validStringData('Incident City', payloadData.incidentCity)
            this.validator.validStringData('Incident State', payloadData.incidentState)
            this.validator.validNumber('Incident Zip', payloadData.incidentZip)
            this.validator.validStringData('Incident Country', payloadData.incidentCountry)

            this.validator.validBoolean('Happened with you', payloadData.happenedToYou)
            this.validator.validBoolean('Happened with someone else', payloadData.happenedToElse)

            if (payloadData.anySuspect && payloadData.anySuspect != "false") {
                console.log(payloadData.anySuspect)
                this.validator.validStringData('Suspect Name', payloadData.suspectName)
                this.validator.validPhoneNumber('Suspect PhoneNumber', payloadData.suspectPhone)
            }
            this.validator.validNumber('No of Witnesses', payloadData.witnessCount)
            if (payloadData.witnessCount && payloadData.witnessCount > 0) {
                this.validator.validStringData('Witness1 Name', payloadData.witness1Name)
                this.validator.validPhoneNumber('Witness1 PhoneNumber', payloadData.witness1Contact)
                if (payloadData.witnessCount > 1) {
                    this.validator.validStringData('Witness2 Name', payloadData.witness2Name)
                    this.validator.validPhoneNumber('Witness2 PhoneNumber', payloadData.witness2Contact)
                }
            }

            this.validator.validBoolean('Physical Bullying', payloadData.physicalBullying)
            this.validator.validBoolean('Verbal Bullying', payloadData.verbalBullying)
            this.validator.validBoolean('Cyber Bullying', payloadData.cyberBullying)
            this.validator.validBoolean('Other Bullying', payloadData.otherBullying)

            this.validator.validBoolean('Threat to school', payloadData.threatToSchool)
            this.validator.validBoolean('Threat to student', payloadData.threatToStudent)
            this.validator.validBoolean('Threat to teacher', payloadData.threatToTeacher)
            this.validator.validBoolean('Threat to You', payloadData.threatToYou)
            this.validator.validBoolean('Threat to others', payloadData.threatToOthers)

            this.validator.validBoolean('Covid', payloadData.covid)
            this.validator.validBoolean('Flu', payloadData.flu)
            this.validator.validBoolean('Fever', payloadData.fever)
            this.validator.validBoolean('Other health issue', payloadData.otherHealth)

            this.validator.validBoolean('Unusual Behaviour', payloadData.unusualBehaviour)
            this.validator.validBoolean('Vehicle driving slowly', payloadData.vehichleDrivingSlowly)
            this.validator.validBoolean('Leaving of package or Item', payloadData.leavingOfItem)
            this.validator.validBoolean('Random Activity', payloadData.randomActivity)
            this.validator.validBoolean('Other Suspicious Activity', payloadData.otherSuspiciousActivity)

            this.validator.validBoolean('Sexual Comments', payloadData.sexualComments)
            this.validator.validBoolean('Sexual Advances', payloadData.sexualAdvances)
            this.validator.validBoolean('Cyber Harrassment', payloadData.cyberHarrassment)
            this.validator.validBoolean('Sexual Favours', payloadData.sexualFavours)
            this.validator.validBoolean('Flashing', payloadData.flashing)
            this.validator.validBoolean('Peeping', payloadData.peeping)
            this.validator.validBoolean('Stalking', payloadData.stalking)
            this.validator.validBoolean('Sexual Rumours', payloadData.sexualRumours)
            this.validator.validBoolean('Gripping/Pulling', payloadData.gripPull)
            this.validator.validBoolean('Other Sexual Activity', payloadData.otherSexualActivity)

            //mental health related validations
            this.mentalHealthValidations(payloadData)
            validated = true
            return validated
        } catch (error) {
            this.helperService.showError(error)
            return false
        }
    };

    //mental health related validations
    mentalHealthValidations = (payloadData) => {
        try {
            this.validator.validBoolean('Substance Misuse', payloadData.drugsNASubstanceMisuse)
            this.validator.validBoolean('Substance Misuse', payloadData.drinkSubstanceMisuse)
            this.validator.validBoolean('Substance Misuse', payloadData.friendsSubstanceMisuse)
            this.validator.validBoolean('Substance Misuse', payloadData.concernSubstanceMisuse)
            this.validator.validBoolean('Substance Misuse', payloadData.relativesSubstanceMisuse)
            this.validator.validBoolean('Substance Misuse', payloadData.struggleSubstanceMisuse)
            this.validator.validBoolean('Substance Misuse', payloadData.alcoholSubstanceMisuse)
            this.validator.validBoolean('Substance Misuse', payloadData.decidedSubstanceMisuse)
            this.validator.validBoolean('Substance Misuse', payloadData.lifeSubstanceMisuse)
            this.validator.validBoolean('Substance Misuse', payloadData.upsetSubstanceMisuse)
            this.validator.validBoolean('Suicide', payloadData.deadwishSuicide)
            this.validator.validBoolean('Suicide', payloadData.nonSpecificReasonSuicide)
            this.validator.validBoolean('Suicide', payloadData.nospecificReasonSuicide)
            this.validator.validBoolean('Suicide', payloadData.specificReasonSuicide)
            this.validator.validBoolean('Suicide', payloadData.behaviourSuicide)
            this.validator.validBoolean('Eat Disorder', payloadData.refuseEatDisorder)
            this.validator.validBoolean('Eat Disorder', payloadData.publicEatDisorder)
            this.validator.validBoolean('Eat Disorder', payloadData.caloriesEatDisorder)
            this.validator.validBoolean('Eat Disorder', payloadData.breakingEatDisorder)
            this.validator.validBoolean('Eat Disorder', payloadData.bodyShapeEatDisorder)
            this.validator.validBoolean('Eat Disorder', payloadData.vomitEatDisorder)
            this.validator.validBoolean('Depression', payloadData.sadnessDepression)
            this.validator.validBoolean('Depression', payloadData.hisroryDepression)
            this.validator.validBoolean('Depression', payloadData.hopelessDepression)
            this.validator.validBoolean('Depression', payloadData.suicidalDepression)
            this.validator.validBoolean('Depression', payloadData.lowEnergyDepression)
            this.validator.validBoolean('Depression', payloadData.failureDepression)
            this.validator.validBoolean('Anxiety', payloadData.dailyAnxiety)
            this.validator.validBoolean('Anxiety', payloadData.concentrationAnxiety)
            this.validator.validBoolean('Anxiety', payloadData.fearAnxiety)
            this.validator.validBoolean('Anxiety', payloadData.unsocialAnxiety)
            this.validator.validBoolean('Anxiety', payloadData.healthAnxiety)
            this.validator.validBoolean('Anxiety', payloadData.interferingAnxiety)
            return true
        } catch (error) {
            throw error
        }
    };


}