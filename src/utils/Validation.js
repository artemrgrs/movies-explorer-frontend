import React from 'react';
import { useCallback } from 'react'

export function useFormWithValidation() {
    const [values, setValues] = React.useState({});
    const [errors, setErrors] = React.useState({});
    const [isValid, setIsValid] = React.useState(false);

    const handleChange = (e) => {
        const input = e.target;
        const name = input.name;
        const value = input.value;
        setValues({
            ...values,
            [name]: value
        });
        setErrors({
            ...errors,
            [name]: input.validationMessage
        });
        setIsValid(input.closest("form").checkValidity());
    };

    const resetForm = useCallback(
        (newValues = {}, newErrors = {}, newIsValid = false) => {
            setValues(newValues);
            setErrors(newErrors);
            setIsValid(newIsValid);
        },
        [setValues, setErrors, setIsValid]
    );

    return { values, handleChange, errors, isValid, resetForm, setIsValid, setValues };
}