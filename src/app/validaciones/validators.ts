import { AbstractControl, ValidatorFn, ValidationErrors, Validators } from '@angular/forms';

export class CustomValidators {
  static onlyLetters(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null; // Si el valor es nulo, no se aplica la validación
      }

      const isValid = /^[A-Za-z\s]*$/.test(control.value);

      return isValid ? null : { onlyLetters: true };
    };
  }

  static minLength(min: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null; // Si el valor es nulo, no se aplica la validación
      }

      const isValid = /^[A-Za-z\s]{3,}$/.test(control.value);

      return isValid ? null : { minLength: true };
    };
  }

  static domainValidator(validDomains: string[]): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value) {
        const email = control.value as string;

        // Verifica la presencia del símbolo '@' en el correo electrónico
        if (!email.includes('@')) {
          return { missingAtSymbol: true };
        }

        const domain = email.split('@')[1]; // Obtén el dominio del correo electrónico

        if (validDomains.some(validDomain => domain.endsWith(validDomain))) {
          return null; // Dominio válido
        }
      }
      return { invalidDomain: true }; // Dominio no válido
    };
  }

  static stateValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const validStates = ['activo', 'inactivo'];
      if (!control.value) {
        return null; // Si el valor es nulo, no se aplica la validación
      }

      const isValid = validStates.includes(control.value.toLowerCase());

      return isValid ? null : { invalidState: true };
    };
  }

  static stateValidatortwo(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const validStates = ['4', '5', '6', '7'];
      if (!control.value) {
        return null; // Si el valor es nulo, no se aplica la validación
      }

      const isValid = validStates.includes(control.value.toLowerCase());

      return isValid ? null : { invalidStatetwo: true };
    };
  }

  static placaValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null; // Si el valor es nulo, no se aplica la validación
      }
  
      // Comprueba que "Placa" contiene exactamente 3 letras mayúsculas seguidas de 2 números
      // con un carácter opcional adicional, todo en mayúsculas
      const isValid = /^[A-Z]{3}[0-9]{2}[A-Z0-9]?$/.test(control.value);
  
      return isValid ? null : { invalidPlaca: true };
    };
  }

  static transportadoraValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const validStates = ['1', '2', '3', '4', '5'];
      if (!control.value) {
        return null; // Si el valor es nulo, no se aplica la validación
      }

      const isValid = validStates.includes(control.value.toLowerCase());

      return isValid ? null : { invalidTransportadora: true };
    };
  }

  static numeroDocumentoValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (!control.value) {
        return null; // If the value is empty, validation passes
      }

      const isValid = /^[0-9]{5,10}$/.test(control.value);

      return isValid ? null : { invalidNumeroDocumento: true };
    };
  }
}
