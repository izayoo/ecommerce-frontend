export function useValidation(){

    /**
     * Required validation.
     * The value must not be empty
     */
    function required(value: any, attrib: string = ''){
        if(Array.isArray(value)) {
           if(value.length > 0) return true
           return `The ${attrib} field is required.`
        }
       
        if(typeof value === 'number') return true
        if(typeof value === 'boolean') return true
        if (value) return true
        return `The ${attrib} field is required.`
    }

    /**
     * Email validation.
     * Check if value is a valid email
     */
    function email(value: any, attrib: string = 'email'){
        if (/.+@.+\..+/.test(value)) return true
        return `The ${attrib} must be a valid email.`
    }

    /**
     * Max length validation
     * Checks if length of an array or string is equal to specified length
     */
    function max(value:any, needle:number, attrib: string = ''){
        if (value.length === needle) return true
        return `The ${attrib} field must not be grater than ${needle}.`
    }

    /**
     * Boolean validation.
     * 
     * Checks if boolean value true
     */
    function booleanTrue(value:boolean, errorMsg: string = ''){
        if (value) return true
        return errorMsg
    }

    /**
     * Numeric validation.
     * 
     * Checks if value is numeric
     */
    function numeric(value:any, attrib: string = ''){
        if (!isNaN(value)) return true
        return `The ${attrib} must be numeric.`
    }

    /**
     * Check if value matches with the specified value
     */
    function matches(value:any, needle:string, attrib: string = ''){
        if(value == needle) return true
        return `The ${attrib} does not match.`
    }

    return {
        required,
        email,
        max,
        booleanTrue,
        numeric,
        matches,
    }
}