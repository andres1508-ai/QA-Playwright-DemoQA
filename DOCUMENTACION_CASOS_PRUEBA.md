================================================================================
                    DOCUMENTACIÓN DE CASOS DE PRUEBA
                    DemoQA Automation Practice Form
================================================================================

Proyecto:           Taller QA Automatizador Junior
Aplicación bajo prueba: https://demoqa.com/automation-practice-form
Fecha de elaboración:   15 de enero de 2026
Framework utilizado:    Playwright v1.57.0
Entorno de ejecución:   Node.js v24.13.0 / Chromium Headless

--------------------------------------------------------------------------------
                         RESUMEN EJECUTIVO
--------------------------------------------------------------------------------

Este documento presenta la documentación completa de los casos de prueba 
automatizados desarrollados para el formulario de práctica de DemoQA. La suite
de pruebas fue diseñada aplicando técnicas de testing reconocidas en la 
industria con el objetivo de maximizar la detección de defectos con un número
óptimo de casos de prueba.

MÉTRICAS DE EJECUCIÓN:

    Tests ejecutados:       10
    Tests exitosos:          8 (80%)
    Tests fallidos:          2 (20%)
    Bugs detectados:         1 (en la aplicación bajo prueba)

RESUMEN POR CASO DE PRUEBA:

    TC-01   Registro con campos mínimos              PASÓ (4.7s)
    TC-02   Validación longitud mínima celular       PASÓ (4.0s)
    TC-03   Validación longitud máxima celular       PASÓ (4.2s)
    TC-04.1 Hobbies Sports + Music                   PASÓ (4.5s)
    TC-04.2 Hobbies con Subject Math                 FALLÓ (Bug detectado)
    TC-04.3 Todos los hobbies                        PASÓ (6.7s)
    TC-04.4 Hobbies con múltiples Subjects           FALLÓ (Bug detectado)
    TC-05   Validación formato de email              PASÓ (6.5s)
    TC-06   Selección de fecha de nacimiento         PASÓ (5.6s)
    TC-07   Dependencia Estado y Ciudad              PASÓ (4.8s)


================================================================================
                    SECCIÓN 1: CASOS DE PRUEBA DETALLADOS
================================================================================


--------------------------------------------------------------------------------
CASO DE PRUEBA TC-01
Registro Exitoso con Campos Mínimos Obligatorios
--------------------------------------------------------------------------------

Identificador:      TC-01
Nombre:             Registro Exitoso con Campos Mínimos (Smoke Test)
Técnica aplicada:   Partición de Equivalencia - Clase Válida
Prioridad:          Alta
Tipo:               Funcional / Smoke Test

OBJETIVO:
Este caso de prueba tiene como propósito verificar que el formulario de 
registro permite el envío exitoso cuando se completan únicamente los campos
marcados como obligatorios por la aplicación. Este escenario representa el
flujo mínimo viable que un usuario debe completar para registrarse.

PRECONDICIONES:
- El navegador debe tener acceso a internet
- La página de DemoQA debe estar disponible y accesible
- No debe haber sesiones previas que interfieran con el formulario

DATOS DE ENTRADA:
    Campo               Valor
    ------------------- --------------------
    First Name          Ana
    Last Name           Lopez
    Gender              Female
    Mobile Number       3101234567

PROCEDIMIENTO DE PRUEBA:
1. Navegar a la URL del formulario de práctica de DemoQA
2. Localizar el campo "First Name" e ingresar el valor "Ana"
3. Localizar el campo "Last Name" e ingresar el valor "Lopez"
4. En la sección "Gender", seleccionar la opción "Female" haciendo clic
   en el radio button correspondiente
5. Localizar el campo "Mobile" e ingresar el número "3101234567"
6. Dejar todos los demás campos vacíos (Email, Date of Birth, Subjects,
   Hobbies, Picture, Current Address, State, City)
7. Hacer clic en el botón "Submit" ubicado al final del formulario
8. Observar el comportamiento del sistema

RESULTADO ESPERADO:
El sistema debe mostrar un modal de confirmación con el título "Thanks for
submitting the form". Dentro del modal debe aparecer una tabla que muestre
los datos ingresados: el nombre completo "Ana Lopez", el género "Female" y
el número de celular "3101234567".

RESULTADO OBTENIDO:
El modal de confirmación se mostró correctamente con el título esperado.
La tabla de confirmación mostró todos los datos ingresados de manera precisa.
El formulario se procesó exitosamente sin errores ni advertencias.

ESTADO:             PASÓ
TIEMPO DE EJECUCIÓN: 4.72 segundos


--------------------------------------------------------------------------------
CASO DE PRUEBA TC-02
Validación de Longitud Mínima en Campo Celular
--------------------------------------------------------------------------------

Identificador:      TC-02
Nombre:             Validación de Longitud Mínima en Celular (BVA Min-1)
Técnica aplicada:   Análisis de Valores Límite (Boundary Value Analysis)
Prioridad:          Alta
Tipo:               Validación de datos / Negativo

OBJETIVO:
Verificar que el sistema rechaza correctamente un número de teléfono móvil
que contiene menos dígitos de los requeridos. El campo Mobile requiere 
exactamente 10 dígitos, por lo que este caso prueba el comportamiento con
9 dígitos (un dígito por debajo del límite mínimo aceptable).

FUNDAMENTO TÉCNICO:
La técnica de Análisis de Valores Límite se basa en la observación empírica
de que los errores de programación tienden a concentrarse en los límites de
los rangos válidos. Los programadores frecuentemente cometen errores como
usar operadores de comparación incorrectos (por ejemplo, usar "<" cuando
debería ser "<="). Al probar específicamente los valores en los límites,
se maximiza la probabilidad de detectar este tipo de defectos.

PRECONDICIONES:
- El formulario debe estar cargado y listo para recibir datos
- Los campos de validación deben estar activos

DATOS DE ENTRADA:
    Campo               Valor
    ------------------- --------------------
    First Name          Test
    Last Name           Usuario
    Gender              Male
    Mobile Number       123456789 (9 dígitos - inválido)

PROCEDIMIENTO DE PRUEBA:
1. Navegar al formulario de práctica de DemoQA
2. Completar el campo "First Name" con el valor "Test"
3. Completar el campo "Last Name" con el valor "Usuario"
4. Seleccionar "Male" en la sección de género
5. En el campo "Mobile", ingresar únicamente 9 dígitos: "123456789"
6. Hacer clic en el botón "Submit"
7. Observar si el formulario se envía o si muestra indicadores de error

RESULTADO ESPERADO:
El formulario NO debe enviarse. El campo Mobile debe mostrar un indicador
visual de error, típicamente un borde de color rojo, indicando que el valor
ingresado no cumple con los requisitos de validación. El modal de confirmación
no debe aparecer.

RESULTADO OBTENIDO:
El formulario no se envió como se esperaba. El campo Mobile mostró 
correctamente el borde rojo como indicador de error de validación. El 
formulario completo recibió la clase CSS "was-validated", confirmando que
el mecanismo de validación HTML5 funcionó correctamente.

ESTADO:             PASÓ
TIEMPO DE EJECUCIÓN: 4.05 segundos


--------------------------------------------------------------------------------
CASO DE PRUEBA TC-03
Validación de Longitud Máxima en Campo Celular
--------------------------------------------------------------------------------

Identificador:      TC-03
Nombre:             Validación de Longitud Máxima en Celular (BVA Max+1)
Técnica aplicada:   Análisis de Valores Límite (Boundary Value Analysis)
Prioridad:          Alta
Tipo:               Validación de datos / Negativo

OBJETIVO:
Verificar el comportamiento del campo Mobile cuando el usuario intenta
ingresar más de 10 dígitos. Este caso de prueba evalúa si el sistema
implementa correctamente la restricción de longitud máxima, ya sea
impidiendo la entrada de caracteres adicionales o rechazando el envío
del formulario.

FUNDAMENTO TÉCNICO:
Este caso complementa al TC-02 probando el límite superior del rango válido.
Juntos, TC-02 y TC-03 forman un par de pruebas de límites que verifican que
el campo acepta exactamente 10 dígitos: ni más, ni menos.

DATOS DE ENTRADA:
    Campo               Valor
    ------------------- --------------------
    First Name          Test
    Last Name           Usuario
    Gender              Male
    Mobile Number       12345678901 (11 dígitos - excede el máximo)

PROCEDIMIENTO DE PRUEBA:
1. Navegar al formulario de práctica de DemoQA
2. Completar los campos obligatorios Name y Gender
3. En el campo "Mobile", intentar ingresar 11 dígitos: "12345678901"
4. Observar si el campo acepta todos los dígitos o si trunca la entrada
5. Si acepta los 11 dígitos, hacer clic en Submit y verificar el resultado

RESULTADO ESPERADO:
El sistema debe implementar una de las siguientes protecciones:
Opción A: El campo debe truncar automáticamente la entrada a 10 dígitos,
         impidiendo físicamente que el usuario escriba el dígito número 11
Opción B: Si el campo permite 11 dígitos, el formulario no debe enviarse
         y debe mostrar un error de validación

RESULTADO OBTENIDO:
El campo Mobile implementa la Opción A: truncó automáticamente la entrada
a 10 dígitos. El atributo "maxlength" del campo HTML impide que el usuario
ingrese más caracteres de los permitidos. Esta es una práctica de usabilidad
recomendada ya que previene el error antes de que el usuario intente enviar.

ESTADO:             PASÓ
TIEMPO DE EJECUCIÓN: 4.23 segundos


--------------------------------------------------------------------------------
CASO DE PRUEBA TC-04
Verificación de Selección Múltiple de Hobbies
--------------------------------------------------------------------------------

Identificador:      TC-04 (incluye escenarios 04.1, 04.2, 04.3 y 04.4)
Nombre:             Verificación de Selección Múltiple de Hobbies
Técnica aplicada:   Pruebas Combinatorias (Combinatorial Testing)
Prioridad:          Media-Alta
Tipo:               Funcional / Combinatorio

OBJETIVO GENERAL:
Validar que el sistema procesa y muestra correctamente múltiples selecciones
en el campo Hobbies bajo diferentes combinaciones con el campo Subjects. Este
grupo de casos de prueba fue diseñado específicamente para detectar defectos
de interacción entre campos que solo se manifiestan con ciertas combinaciones
de valores.

FUNDAMENTO TÉCNICO:
Las pruebas combinatorias son esenciales cuando múltiples campos pueden
interactuar entre sí de maneras no obvias. Un sistema puede funcionar 
correctamente cuando cada campo se prueba de forma aislada, pero fallar
cuando ciertos valores se combinan. Este enfoque es particularmente 
importante para detectar defectos de integración a nivel de interfaz.


ESCENARIO TC-04.1: Hobbies Sports + Music sin Subject
.......................................................

DATOS DE ENTRADA:
    Campo               Valor
    ------------------- --------------------
    First Name          Maria
    Last Name           Garcia
    Gender              Female
    Mobile Number       3209876543
    Subjects            (ninguno seleccionado)
    Hobbies             Sports, Music

PROCEDIMIENTO:
1. Completar los campos obligatorios con los datos indicados
2. NO seleccionar ninguna materia en el campo Subjects
3. En la sección Hobbies, marcar el checkbox "Sports"
4. Marcar el checkbox "Music"
5. Verificar visualmente que ambos checkboxes estén seleccionados
6. Hacer clic en Submit
7. Revisar la fila "Hobbies" en la tabla del modal de confirmación

RESULTADO ESPERADO:
La fila "Hobbies" en el modal debe mostrar el texto "Sports, Music"

RESULTADO OBTENIDO:
El modal mostró correctamente "Sports, Music" en la fila de Hobbies.
Este escenario sirve como línea base para comparar con los demás escenarios.

ESTADO: PASÓ
TIEMPO DE EJECUCIÓN: 4.46 segundos


ESCENARIO TC-04.2: Hobbies Reading + Music con Subject Math (BUG DETECTADO)
.............................................................................

DATOS DE ENTRADA:
    Campo               Valor
    ------------------- --------------------
    First Name          Carlos
    Last Name           Martinez
    Gender              Male
    Mobile Number       3156789012
    Subjects            Math
    Hobbies             Reading, Music

PROCEDIMIENTO:
1. Completar los campos obligatorios con los datos indicados
2. En el campo Subjects, escribir "Math" y presionar Enter para seleccionarlo
3. En la sección Hobbies, marcar el checkbox "Reading"
4. Marcar el checkbox "Music"
5. Verificar que ambos checkboxes aparezcan marcados
6. Hacer clic en Submit
7. Revisar la fila "Hobbies" en la tabla del modal de confirmación

RESULTADO ESPERADO:
La fila "Hobbies" en el modal debe mostrar el texto "Reading, Music"

RESULTADO OBTENIDO:
BUG DETECTADO - El campo Hobbies aparece VACÍO en el modal de confirmación,
a pesar de que ambos checkboxes (Reading y Music) estaban visiblemente
seleccionados antes de enviar el formulario. Este es un defecto de la
aplicación que solo se manifiesta cuando se selecciona la materia "Math"
en combinación con ciertos hobbies.

ESTADO: FALLÓ (Defecto de la aplicación bajo prueba)
TIEMPO DE EJECUCIÓN: 60.08 segundos (timeout)


ESCENARIO TC-04.3: Todos los Hobbies (Sports + Reading + Music)
................................................................

DATOS DE ENTRADA:
    Campo               Valor
    ------------------- --------------------
    First Name          Laura
    Last Name           Sanchez
    Gender              Female
    Mobile Number       3001234567
    Subjects            (ninguno)
    Hobbies             Sports, Reading, Music (los tres)

RESULTADO ESPERADO:
La fila "Hobbies" debe mostrar "Sports, Reading, Music"

RESULTADO OBTENIDO:
El modal de confirmación mostró correctamente los tres hobbies seleccionados
en la fila correspondiente. Esto confirma que el sistema puede manejar la
selección máxima de opciones cuando no hay materias seleccionadas.

ESTADO: PASÓ
TIEMPO DE EJECUCIÓN: 6.74 segundos


ESCENARIO TC-04.4: Hobbies Reading + Music con Subjects Math y Physics
.......................................................................

DATOS DE ENTRADA:
    Campo               Valor
    ------------------- --------------------
    First Name          Pedro
    Last Name           Lopez
    Gender              Male
    Mobile Number       3187654321
    Subjects            Math, Physics
    Hobbies             Reading, Music

RESULTADO ESPERADO:
La fila "Hobbies" debe mostrar "Reading, Music"
La fila "Subjects" debe mostrar "Math, Physics"

RESULTADO OBTENIDO:
BUG DETECTADO - Similar al TC-04.2, cuando se seleccionan las materias
"Math" y "Physics" junto con los hobbies "Reading" y "Music", el campo
de hobbies aparece vacío en el modal de confirmación. Este escenario
confirma que el bug no es exclusivo de seleccionar solo "Math", sino
que afecta a cualquier combinación que incluya "Math" como materia.

ESTADO: FALLÓ (Defecto de la aplicación bajo prueba)
TIEMPO DE EJECUCIÓN: 60.07 segundos (timeout)


--------------------------------------------------------------------------------
CASO DE PRUEBA TC-05
Validación de Formato de Email
--------------------------------------------------------------------------------

Identificador:      TC-05
Nombre:             Validación de Formato de Email
Técnica aplicada:   Partición de Equivalencia - Clase Inválida
Prioridad:          Media
Tipo:               Validación de datos / Negativo

OBJETIVO:
Verificar que el campo de correo electrónico rechaza formatos que no cumplen
con la estructura estándar de un email válido. Específicamente, este caso
prueba un email que carece de la extensión de dominio (como .com, .org, etc.).

FUNDAMENTO TÉCNICO:
La Partición de Equivalencia divide los posibles valores de entrada en clases
que se comportan de manera equivalente. Para el campo email existen dos clases
principales: emails válidos (con formato correcto) y emails inválidos (con
formato incorrecto). Dentro de la clase de emails inválidos, "test@test"
representa a todos los emails que tienen arroba pero carecen de extensión
de dominio.

DATOS DE ENTRADA:
    Campo               Valor
    ------------------- --------------------
    First Name          Test
    Last Name           Usuario
    Gender              Male
    Mobile Number       3101234567
    Email               test@test (falta extensión de dominio)

PROCEDIMIENTO DE PRUEBA:
1. Completar todos los campos obligatorios con datos válidos
2. En el campo Email, ingresar "test@test" (sin .com ni otra extensión)
3. Hacer clic en Submit
4. Observar el comportamiento del campo Email y del formulario

RESULTADO ESPERADO:
El campo Email debe resaltarse en rojo indicando que el valor es inválido.
El formulario no debe enviarse y no debe aparecer el modal de confirmación.

RESULTADO OBTENIDO:
El campo Email se resaltó correctamente en rojo. La validación HTML5 del
navegador detectó que el formato no cumple con el patrón estándar de email.
El formulario no se envió y el modal de confirmación no apareció.

ESTADO:             PASÓ
TIEMPO DE EJECUCIÓN: 6.55 segundos


--------------------------------------------------------------------------------
CASO DE PRUEBA TC-06
Selección de Fecha de Nacimiento mediante Calendario
--------------------------------------------------------------------------------

Identificador:      TC-06
Nombre:             Selección de Fecha de Nacimiento (Calendario Dinámico)
Técnica aplicada:   Manejo de Elementos Dinámicos
Prioridad:          Media
Tipo:               Funcional / UI Dinámica

OBJETIVO:
Verificar que el widget de calendario para la fecha de nacimiento funciona
correctamente, permitiendo al usuario navegar entre años y meses para
seleccionar una fecha específica. Este caso evalúa tanto la funcionalidad
del calendario como la correcta persistencia del dato seleccionado.

FUNDAMENTO TÉCNICO:
Los elementos dinámicos de interfaz, como calendarios con selectores
desplegables, presentan desafíos especiales para la automatización. Estos
componentes generan elementos del DOM dinámicamente y requieren secuencias
específicas de interacciones para funcionar correctamente. El manejo 
adecuado de estos elementos es crucial para crear pruebas automatizadas
estables y confiables.

DATOS DE ENTRADA:
    Campo               Valor
    ------------------- --------------------
    First Name          Carlos
    Last Name           Martinez
    Gender              Male
    Mobile Number       3156789012
    Date of Birth       30 de mayo de 2000

PROCEDIMIENTO DE PRUEBA:
1. Completar los campos obligatorios con los datos indicados
2. Hacer clic en el campo "Date of Birth" para abrir el widget de calendario
3. Localizar el selector de año y cambiar el valor a "2000"
4. Localizar el selector de mes y cambiar el valor a "May" (mayo)
5. En la cuadrícula de días, localizar y hacer clic en el día "30"
   (asegurándose de no seleccionar días de meses adyacentes que pueden
   aparecer en gris)
6. Verificar que el campo muestre "30 May 2000"
7. Hacer clic en Submit
8. Verificar que la fecha aparezca correctamente en el modal de confirmación

RESULTADO ESPERADO:
El campo Date of Birth debe mostrar "30 May 2000" después de la selección.
En el modal de confirmación, la fila correspondiente debe mostrar la fecha
en el formato "30 May,2000".

RESULTADO OBTENIDO:
El calendario dinámico funcionó correctamente en todas las interacciones.
Los selectores de año y mes respondieron adecuadamente. El día 30 fue
seleccionado sin problemas. La fecha se mostró correctamente tanto en el
campo del formulario como en el modal de confirmación.

ESTADO:             PASÓ
TIEMPO DE EJECUCIÓN: 5.58 segundos


--------------------------------------------------------------------------------
CASO DE PRUEBA TC-07
Dependencia entre Estado y Ciudad
--------------------------------------------------------------------------------

Identificador:      TC-07
Nombre:             Dependencia de Estado y Ciudad
Técnica aplicada:   Pruebas Combinatorias / Lógica de Negocio
Prioridad:          Media
Tipo:               Funcional / Dependencia de datos

OBJETIVO:
Verificar que el dropdown de ciudades muestre únicamente las ciudades que
corresponden al estado previamente seleccionado. Esta es una validación de
lógica de negocio que asegura la integridad de los datos de ubicación.

FUNDAMENTO TÉCNICO:
Las dependencias entre campos son una fuente común de defectos. Cuando un
campo (Ciudad) depende del valor de otro campo (Estado), es necesario
verificar que esta relación se mantenga correctamente. Un defecto típico
sería mostrar ciudades de un estado diferente o mostrar todas las ciudades
sin filtrar.

DATOS DE ENTRADA:
    Campo               Valor
    ------------------- --------------------
    First Name          Laura
    Last Name           Hernandez
    Gender              Female
    Mobile Number       3187654321
    State               Uttar Pradesh
    City                Agra

CIUDADES ESPERADAS PARA UTTAR PRADESH:
    - Agra
    - Lucknow
    - Merrut

PROCEDIMIENTO DE PRUEBA:
1. Completar los campos obligatorios con los datos indicados
2. Hacer scroll hacia el final del formulario para visualizar State y City
3. Hacer clic en el dropdown de State
4. Seleccionar "Uttar Pradesh" de la lista de opciones
5. Hacer clic en el dropdown de City
6. Verificar que las opciones disponibles sean Agra, Lucknow y Merrut
7. Seleccionar "Agra"
8. Hacer clic en Submit
9. Verificar en el modal que aparezcan "Uttar Pradesh" y "Agra"

RESULTADO ESPERADO:
El dropdown de City debe mostrar únicamente las tres ciudades correspondientes
a Uttar Pradesh. Al seleccionar Agra y enviar el formulario, el modal debe
mostrar ambos valores correctamente.

RESULTADO OBTENIDO:
El test se ejecutó correctamente después de corregir el localizador ambiguo.
El dropdown de ciudades mostró únicamente las ciudades pertenecientes a
Uttar Pradesh (Agra, Lucknow, Merrut). Al seleccionar Agra y enviar el 
formulario, el modal de confirmación mostró correctamente "Uttar Pradesh Agra"
en la fila de State and City.

NOTA DE CORRECCIÓN TÉCNICA:
Se corrigió el localizador original que causaba conflicto de elementos
múltiples. El selector corregido utiliza un localizador más específico
para la opción del dropdown.

ESTADO:             PASÓ
TIEMPO DE EJECUCIÓN: 4.75 segundos


================================================================================
            SECCIÓN 2: JUSTIFICACIÓN DE LA ESTRATEGIA DE PRUEBAS
================================================================================


--------------------------------------------------------------------------------
2.1 OBJETIVO DE LA ESTRATEGIA
--------------------------------------------------------------------------------

El objetivo principal de esta estrategia de pruebas es diseñar una suite de
pruebas automatizadas que maximice la detección de defectos utilizando el
menor número de casos de prueba posibles. Para lograr esto, se aplicaron
técnicas de testing reconocidas y ampliamente utilizadas en la industria
del aseguramiento de calidad de software.

La estrategia busca equilibrar tres factores fundamentales:

    COBERTURA:      Asegurar que las funcionalidades críticas del formulario
                    estén probadas adecuadamente.
    
    EFICIENCIA:     Minimizar el número de casos de prueba sin sacrificar
                    la capacidad de detectar defectos.
    
    MANTENIBILIDAD: Crear pruebas que sean fáciles de entender, modificar
                    y extender conforme evolucione la aplicación.


--------------------------------------------------------------------------------
2.2 TÉCNICA: PARTICIÓN DE EQUIVALENCIA
--------------------------------------------------------------------------------

DESCRIPCIÓN DE LA TÉCNICA:

La Partición de Equivalencia (Equivalence Partitioning) es una técnica de
diseño de casos de prueba que divide el dominio de datos de entrada en
clases o particiones donde todos los valores de una misma clase se comportan
de manera equivalente desde el punto de vista del sistema.

El principio fundamental es que si un valor representativo de una clase
funciona correctamente (o falla), todos los demás valores de esa misma
clase también funcionarán (o fallarán) de la misma manera. Por lo tanto,
es suficiente probar un único valor de cada clase para obtener cobertura
completa de esa partición.

APLICACIÓN EN ESTE PROYECTO:

Caso TC-01 - Clase Válida:
Se seleccionaron datos que representan un usuario típico con valores
válidos mínimos. El nombre "Ana Lopez" representa la clase de todos los
nombres válidos posibles. El número "3101234567" representa la clase de
todos los números de 10 dígitos válidos. Si el sistema acepta estos datos,
podemos inferir con alta confianza que aceptará cualquier combinación
similar de datos válidos.

Caso TC-05 - Clase Inválida:
El email "test@test" representa la clase de emails mal formateados que
tienen el símbolo arroba pero carecen de extensión de dominio. Esta clase
incluye ejemplos como "usuario@empresa", "correo@servidor", etc. Al
verificar que el sistema rechaza "test@test", confirmamos que rechazará
todos los emails de esta clase de equivalencia.

BENEFICIO OBTENIDO:

En lugar de probar cientos de combinaciones de nombres, géneros y números
de teléfono válidos, se probó una sola combinación representativa. Esto
reduce dramáticamente el tiempo de ejecución y mantenimiento de las pruebas
mientras se mantiene una cobertura efectiva de las clases de equivalencia.


--------------------------------------------------------------------------------
2.3 TÉCNICA: ANÁLISIS DE VALORES LÍMITE (BVA)
--------------------------------------------------------------------------------

DESCRIPCIÓN DE LA TÉCNICA:

El Análisis de Valores Límite (Boundary Value Analysis) se fundamenta en
la observación empírica de que los defectos de software tienden a
concentrarse en los límites de los rangos de valores válidos. Esta
concentración de defectos ocurre porque los programadores frecuentemente
cometen errores al implementar condiciones de límite, como usar el operador
incorrecto de comparación o calcular mal el punto exacto del límite.

La técnica prescribe probar los valores exactamente en el límite, justo
por debajo del límite (límite - 1), y justo por encima del límite 
(límite + 1). Estos tres puntos tienen la mayor probabilidad de revelar
defectos relacionados con el manejo de límites.

APLICACIÓN EN ESTE PROYECTO:

El campo Mobile Number tiene un requisito de exactamente 10 dígitos. Esto
establece dos límites claros:

    Límite inferior:    10 dígitos (mínimo aceptable)
    Límite superior:    10 dígitos (máximo aceptable)

Los casos de prueba diseñados fueron:

    TC-02 (Límite inferior - 1):
    Se probó con 9 dígitos ("123456789"). Este valor está justo por debajo
    del límite inferior aceptable. El sistema correctamente rechazó este
    valor, mostrando el indicador visual de error.

    TC-01 (Valor válido en el límite):
    Se probó con exactamente 10 dígitos ("3101234567"). Este valor está
    exactamente en el límite válido. El sistema correctamente aceptó
    este valor.

    TC-03 (Límite superior + 1):
    Se intentó ingresar 11 dígitos ("12345678901"). El sistema implementó
    una protección a nivel de campo que truncó la entrada a 10 dígitos,
    impidiendo que el usuario excediera el límite máximo.

BENEFICIO OBTENIDO:

Estos tres casos de prueba proporcionan alta confianza en que el sistema
maneja correctamente todas las longitudes de número de teléfono. Si los
límites están correctamente implementados (como se demostró), los valores
intermedios (como 5 dígitos o 8 dígitos) también serán rechazados, y los
valores de exactamente 10 dígitos serán aceptados.


--------------------------------------------------------------------------------
2.4 TÉCNICA: PRUEBAS COMBINATORIAS
--------------------------------------------------------------------------------

DESCRIPCIÓN DE LA TÉCNICA:

Las Pruebas Combinatorias (Combinatorial Testing) abordan un problema
fundamental del testing: los defectos de interacción. Muchos sistemas
funcionan correctamente cuando cada funcionalidad se prueba de forma
aislada, pero fallan cuando ciertas combinaciones de valores interactúan
entre sí.

El enfoque combinatorio identifica los parámetros que pueden interactuar
y diseña sistemáticamente casos de prueba que cubren las combinaciones
más relevantes. Esto es especialmente importante en formularios con
múltiples campos opcionales que pueden afectarse mutuamente.

APLICACIÓN EN ESTE PROYECTO:

El campo Hobbies (checkboxes de selección múltiple) y el campo Subjects
(selector de materias) presentaban potencial de interacción. Para
investigar esto, se diseñó una matriz de combinaciones:

    Escenario       Subjects            Hobbies             Propósito
    --------------- ------------------- ------------------- -------------------
    TC-04.1         Ninguno             Sports + Music      Línea base
    TC-04.2         Math                Reading + Music     Detectar interacción
    TC-04.3         Ninguno             Los tres hobbies    Selección máxima
    TC-04.4         Math + Physics      Reading + Music     Múltiples en ambos

HALLAZGO CRÍTICO:

El escenario TC-04.2 reveló un defecto que no habría sido detectado con
pruebas aisladas. Cuando se selecciona la materia "Math" en combinación
con los hobbies "Reading" y "Music", el sistema falla al mostrar los
hobbies en el modal de confirmación (aparecen vacíos).

Este defecto es particularmente insidioso porque:
- Los checkboxes aparecen visualmente seleccionados
- El formulario se envía sin errores aparentes
- Solo al revisar el modal de confirmación se detecta el problema

Sin el enfoque combinatorio, este defecto probablemente pasaría a producción,
afectando la integridad de los datos registrados.


--------------------------------------------------------------------------------
2.5 TÉCNICA: MANEJO DE ELEMENTOS DINÁMICOS
--------------------------------------------------------------------------------

DESCRIPCIÓN DE LA TÉCNICA:

El Manejo de Elementos Dinámicos es una técnica específica de automatización
de pruebas que aborda los desafíos de interactuar con componentes de interfaz
que se generan o modifican dinámicamente. Estos elementos incluyen calendarios,
menús desplegables con búsqueda, modales, autocompletados y otros widgets
interactivos.

Los elementos dinámicos presentan varios desafíos técnicos:
- Pueden no existir en el DOM hasta que el usuario interactúa con ellos
- Su estructura puede cambiar basándose en el contexto
- Requieren secuencias específicas de acciones para funcionar
- Pueden tener múltiples elementos con textos similares

APLICACIÓN EN ESTE PROYECTO:

El calendario de fecha de nacimiento (Date of Birth) es un componente
React DatePicker que requiere una secuencia específica de interacciones:

    Paso 1: Hacer clic en el campo para abrir el widget del calendario
    
    Paso 2: El widget genera dinámicamente selectores para año y mes
    
    Paso 3: Seleccionar el año deseado del dropdown de años
            (esto regenera la cuadrícula de días)
    
    Paso 4: Seleccionar el mes deseado del dropdown de meses
            (esto vuelve a regenerar la cuadrícula de días)
    
    Paso 5: Localizar y hacer clic en el día específico
            (evitando los días "fantasma" de meses adyacentes)

El código de automatización implementado maneja esta complejidad:

    await page.click('#dateOfBirthInput');
    await page.selectOption('.react-datepicker__year-select', '2000');
    await page.selectOption('.react-datepicker__month-select', '4');
    await page.click('.react-datepicker__day--030:not(.react-datepicker__day--outside-month)');

El selector del día incluye ":not(.react-datepicker__day--outside-month)"
para asegurar que se selecciona el día 30 del mes correcto y no un día
visible pero perteneciente al mes anterior o siguiente.


--------------------------------------------------------------------------------
2.6 MATRIZ DE TRAZABILIDAD
--------------------------------------------------------------------------------

La siguiente tabla relaciona cada técnica aplicada con los objetivos de
testing que satisface y los tipos de defectos que está diseñada para detectar:

Técnica                     Objetivo Principal              Defectos Detectables
--------------------------- ------------------------------- -----------------------
Partición de Equivalencia   Reducir casos de prueba         Validaciones faltantes
                            manteniendo cobertura           Lógica de negocio básica
                            representativa                  Errores de tipo de dato

Análisis de Valores Límite  Verificar comportamiento        Errores off-by-one
                            en extremos de rangos           Comparadores incorrectos
                            de valores                      Límites mal calculados

Pruebas Combinatorias       Detectar defectos de            Interacciones inesperadas
                            interacción entre campos        Estados inconsistentes
                            o parámetros                    Bugs de integración UI

Elementos Dinámicos         Garantizar estabilidad          Problemas de timing
                            en automatización de            Sincronización fallida
                            componentes interactivos        Selectores ambiguos


--------------------------------------------------------------------------------
2.7 COBERTURA FUNCIONAL ALCANZADA
--------------------------------------------------------------------------------

El conjunto de casos de prueba diseñados proporciona cobertura para las
siguientes funcionalidades del formulario:

Funcionalidad                   Casos de Prueba     Técnica Aplicada
------------------------------- ------------------- -----------------------
Envío con campos obligatorios   TC-01               Partición Equivalencia
Validación de longitud Mobile   TC-02, TC-03        Valores Límite (BVA)
Selección múltiple Hobbies      TC-04.1 a TC-04.4   Combinatoria
Validación de formato Email     TC-05               Partición Equivalencia
Calendario de fecha             TC-06               Elementos Dinámicos
Dependencia Estado/Ciudad       TC-07               Combinatoria


--------------------------------------------------------------------------------
2.8 DECISIONES DE DISEÑO DEL CÓDIGO DE PRUEBAS
--------------------------------------------------------------------------------

PATRÓN AAA (ARRANGE-ACT-ASSERT):

Todos los casos de prueba siguen el patrón estructural AAA, que divide
cada test en tres secciones claramente identificadas:

    ARRANGE (Preparar):
    En esta sección se definen los datos de prueba y se prepara el
    estado inicial necesario. Por ejemplo, se declaran los objetos con
    los valores que se ingresarán en el formulario.

    ACT (Actuar):
    Esta sección contiene las acciones que simulan el comportamiento
    del usuario: llenar campos, hacer clics, seleccionar opciones.
    Estas son las operaciones que se están probando.

    ASSERT (Verificar):
    La sección final contiene las verificaciones que determinan si
    la prueba pasa o falla. Se comparan los resultados obtenidos
    contra los resultados esperados.

Este patrón mejora significativamente la legibilidad y mantenibilidad
del código de pruebas, permitiendo identificar rápidamente qué parte
del test falla y por qué.


SELECTORES CENTRALIZADOS:

Los selectores de elementos (IDs, clases, atributos) están definidos
en un objeto constante al inicio del archivo de pruebas:

    const SELECTORES = {
        nombre: '#firstName',
        apellido: '#lastName',
        email: '#userEmail',
        celular: '#userNumber',
        ...
    };

Esta práctica proporciona los siguientes beneficios:
- Si el equipo de desarrollo cambia un ID, solo hay que actualizarlo
  en un lugar del código de pruebas
- Los nombres descriptivos en español mejoran la comprensión
- Reduce errores de tipeo al reutilizar constantes
- Facilita revisiones de código y auditorías


USO DE FORCE: TRUE EN CLICKS:

Varias acciones de clic incluyen la opción { force: true }:

    await page.click(SELECTORES.botonEnviar, { force: true });

Esta configuración es necesaria porque la página de DemoQA contiene
anuncios publicitarios que ocasionalmente se superponen a elementos
del formulario. Sin force: true, Playwright detectaría que otro
elemento intercepta el clic y fallaría el test.

Es importante notar que force: true es apropiado en este contexto
porque los anuncios no son parte de la funcionalidad que se está
probando. El objetivo es verificar el comportamiento del formulario,
no la interferencia de publicidad externa.


================================================================================
                    SECCIÓN 3: INFORMACIÓN TÉCNICA
================================================================================


--------------------------------------------------------------------------------
3.1 HERRAMIENTAS Y VERSIONES
--------------------------------------------------------------------------------

Framework de automatización:    Playwright versión 1.57.0
Entorno de ejecución:           Node.js versión 24.13.0
Navegador de pruebas:           Chromium (modo headless)
Sistema operativo:              Windows

--------------------------------------------------------------------------------
3.2 CONFIGURACIÓN DE EJECUCIÓN
--------------------------------------------------------------------------------

Timeout por test:               60 segundos
Timeout de expectativas:        10 segundos
Modo de ejecución:              Headless (sin interfaz gráfica visible)
Workers paralelos:              1 (ejecución secuencial)
Reintentos automáticos:         0 (sin reintentos)

--------------------------------------------------------------------------------
3.3 COMANDOS DE EJECUCIÓN
--------------------------------------------------------------------------------

Para ejecutar todos los tests:
    npm test

Para ejecutar tests con interfaz visual de depuración:
    npm run test:ui

Para ejecutar tests con el navegador visible:
    npm run test:headed

Para ver el reporte HTML de la última ejecución:
    npx playwright show-report

Para regenerar la documentación:
    npm run docs


================================================================================
                         FIN DEL DOCUMENTO
================================================================================

Documento generado el 15 de enero de 2026
Proyecto: Taller QA Automatizador Junior
Repositorio: https://github.com/andres1508-ai/QA-Playwright-DemoQA
