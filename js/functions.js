/*
 *  Mostrará por pantalla el día de la semana en el que
 *  cae la fecha que se pedirá al usuario por teclado.
 *  El valor del año estará entre 1601 y 3000. 
 */

// Declaración de variables
var dateC; // Cadena de texto
var year, month, day, fDM, D, dW; // Enteros
var S, OK; // Booleanos
var seguir; // Caracter

S = true;
while (S) {
    // Pedir por teclado la fecha indicando el formato
    dateC = prompt('FECHA (DD/MM/AAAA)....');
    // Comprobar que la fecha es válida
    OK = isDateOk(dateC);
    if (OK) {;
        // Si la fecha es correcta
        day = parseInt(dateC.substring(0, 2));
        month = parseInt(dateC.substring(3, 5));
        year = parseInt(dateC.substring(6, 10));
        fDM = firstDayMonth(year, month); // Primer día del mes
        D = ((day - 1) % 7);
        dW = fDM + D; // Día de la semana en que cae la fecha
        if (dW > 7) {
            dW = (dW - 7);
        }
        alert("LA FECHA " + dateC + " CAE EN " + dayWeekText(dW));
    } else {
        // Si la fecha no es correcta
        alert("FECHA INCORRECTA. INTÉNTALO DE NUEVO.");
    }
    // Da la opción de seguir o salir del programa
    seguir = prompt("Pulsar la tecla S para continuar....");
    if (seguir == 's' | seguir == 'S') {
        S = true;
    } else {
        S = false;
    }
}


/** 
 * Comprueba que la fecha tiene el formato 
 * correcto y que es una fecha válida
 **/

function isDateOk(dateC) {
    // Declarar variables
    var OK; // Booleano
    var lDate, month, year, day; // Enteros

    lDate = dateC.length;
    if (lDate != 10) {
        OK = false; // La cadena no tiene 10 caracteres, luego es incorrecta
    } else {
        // Comprobar si los caracteres de separación son los correctos
        OK = separadorOk(dateC);
        if (OK) {
            // Comprobar que los demás caracteres sean todos numéricos
            OK = isNumberDate(dateC);
            if (OK) {
                // Si todos son numéricos convertir a número para poder calcular
                day = parseInt(dateC.substring(0, 2));
                month = parseInt(dateC.substring(3, 5));
                year = parseInt(dateC.substring(6, 10));
                // Comprobar si el mes es correcto
                OK = monthOk(month);
                if (OK) {
                    // Comprobar si el año es correcto
                    OK = yearOk(year);
                    if (OK) {
                        OK = dayOk(day, month, year);
                    }
                }

            }
        }
    }

    return OK;
}

// Comprueba que los caracteres separadores son los correctos
function separadorOk(dateC) {
    var OK;

    if ((dateC.substring(2, 3) == '/') & (dateC.substring(5, 6) == '/')) {
        OK = true;
    } else {
        if ((dateC.substring(2, 3) == '-') & (dateC.substring(5, 6) == '-')) {
            OK = true;
        } else {
            OK = false;
        }
    }
    return OK;
}


// Comprueba que los caracteres del día, mes y año sean numéricos
function isNumberDate(dateC) {
    // Declarar variables
    var OK;
    var i;

    i = 0;
    while (i < 10) {
        if ((i == 2) | (i == 5)) {
            i = i + 1;
        } else {
            if (isNumber(dateC.charAt(i))) {
                OK = true;
                i++;
            } else {
                OK = false;
                i = 10;
            }
        }
    }
    return OK;
}


// Comprueba si un caracter es un número
function isNumber(C) {
    //Declarar variables
    var i;
    var iN;
    var num = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

    // Comprobar si es un número entre 0 y 9
    for (i = 0; i < 10; i++) {
        if (C == num[i]) {
            iN = true;
            i = 10; // Es un número, salir del bucle
        } else {
            iN = false; // No es un número
        }
    }
    return iN;
}

// Comprueba si el mes de la fecha es válido
function monthOk(month) {
    // Declarar variables
    var OK;

    if ((month >= 1) & (month <= 12)) {
        OK = true;
    } else {
        OK = false;
    }

    return OK;
}

// Comprueba si el día de la fecha es válido
function yearOk(year) {
    // Declarar variables
    var OK;
    if ((year >= 1601) & (year <= 3000)) {
        OK = true;
    } else {
        OK = false;
    }
    return OK;
}


// Comprueba si el día de la fecha es válido
function dayOk(day, month, year) {
    // Declarar variables
    var OK;

    if ((day >= 1) & (day <= 31)) {
        switch (day) {
            case 31:
                if (month == 1 | month == 3 | month == 5 | month == 7 | month == 8 | month == 10 | month == 12) {
                    OK = true;
                } else {
                    OK = false;
                }
                break;
            case 30:
                if (month == 2) {
                    OK = false;
                } else {
                    OK = true;
                }
                break;
            case 29:
                if ((month == 1) | (month >= 3 & month <= 12) | ((month == 2) & isLeapYear(year))) {
                    OK = true;
                } else {
                    OK = false;
                }
                break;
            default:
                OK = true;
        }
    }
    else {
        OK = false;
    }

    return OK;
}

/**
 * Recibe el año (year) y mes (month) correspondientes y
 * devuelve el día de la semana (dW) en el que cae el primer 
 * día del mes de ese año
 */
function firstDayMonth(year, month) {
    // Declarar variables
    var fDY, dW, i;
    var lY;

    lY = isLeapYear(year); // ¿Es una año bisiesto?
    fDY = firstDayYear(year); // Primer día de la semana del año
    for (i = 1; i <= month; i++) {
        // Si es enero, el primer día será el primer día del año
        if (i == 1) {
            dW = fDY;
        }
        // Si es marzo, el primer día dependerá de si el año es bisiesto o no
        if (i == 3) {
            if (lY) {
                dW++;
            } else {
                dW = dW;
            }
        }
        // Si es un mes precedido de otro de 31 días, se le sumarán 3 días
        if ((i == 2) | (i == 4) | (i == 6) | (i == 8) | (i == 9) | (i == 11)) {
            dW += 3;
        }
        // Si es un mes precedido de otro de 30 días, se le sumarán 2 días
        if ((i == 5) | (i == 7) | (i == 10) | (i == 12)) {
            dW += 2;
        }
        // Si llega a 8, es lunes
        if (dW == 8) {
            dW = 1;
        }
        // Si llega a 9, es martes
        if (dW == 9) {
            dW = 2;
        }
        // Si llega a 10, es miércoles
        if (dW == 10) {
            dW = 3;
        }
    }
    return dW;
}

/** 
 * Recibe el año (year) y devuelve (lY) si es bisiesto o no
 */
function isLeapYear(year) {
    var lY;
    // Si el año es multiplo de 4
    if (year % 4 == 0) {
        lY = true;
        // Si además es múltiplo de 100 y de 400
        if ((year % 100 != 0) | (year % 400 == 0)) {
            lY = true;
        } else {
            lY = false;
        }
    } else {
        lY = false;
    }
    return lY;
}

/**
 * Recibe el año (year) correspondiente y
 * devuelve el día de la semana (dW) en el que 
 * cae el primer día de dicho año
 */
function firstDayYear(year) {
    var dW, i;
    var lY;
    if (year == 1601) {
        //Si es 1601, el primer día del año es lunes
    } else {
        // Si el año es mayor que 1601, buscar el primer día del año

        dW = 1; // Se empieza en lunes
        for (i = 1602; i <= year; i++) {
            // Si el año anterior fue bisiesto al día de la semana
            // habrá que sumarle dos más, y sino uno.
            lY = isLeapYear(i - 1);
            if (lY) {
                dW += 2;
            } else {
                dW++;
            }
            // Si se llega a 8, es lunes
            if (dW == 8) {
                dW = 1;
            }
            // Si se llega a 9, es martes
            if (dW == 9) {
                dW = 2;
            }
        }
    }
    return dW;
}



// Devuelve el día de la semana en texto
function dayWeekText(dW) {
    // Declarar variables
    var dWT;

    switch (dW) {
        case 1:
            dWT = "LUNES";
            break;
        case 2:
            dWT = "MARTES";
            break;
        case 3:
            dWT = "MIÉRCOLES";
            break;
        case 4:
            dWT = "JUEVES";
            break;
        case 5:
            dWT = "VIERNES";
            break;
        case 6:
            dWT = "SÁBADO";
            break;
        case 7:
            dWT = "DOMINGO";
            break;
        default:
            dWT = "PARECE QUE HAY ALGÚN ERROR";
    }
    return dWT;
}
