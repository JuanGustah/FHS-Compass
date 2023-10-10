export interface Validable{
    value: string | number;
    isRequired?: boolean;
    isEmail?: boolean;
}

export function validator(validableObject:Validable){
    const value = validableObject.value;
    let isValid = true;    

    if(validableObject.isRequired){
        isValid = isValid && value.toString().length !==0;
    }

    if(validableObject.isEmail){
        //regex para validação de e-mail explicado em https://www.abstractapi.com/guides/email-validation-regex-javascript
        isValid = isValid && value.toString().match(/^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/) !== null;
    }

    return isValid;
}