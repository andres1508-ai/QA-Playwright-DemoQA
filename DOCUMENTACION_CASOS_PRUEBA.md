# Documentación de Casos de Prueba - DemoQA Automation Form

**Última actualización:** 15/1/2026

## Resumen de Ejecución

| Métrica | Valor |
|---------|-------|
| ✅ Tests Pasados | 7/10 |
| ❌ Tests Fallidos | 2/10 |
| ⏳ Pendientes | 2/10 |
| 📊 Porcentaje de Éxito | 70% |

### Resumen de Casos TC-04 (Hobbies Múltiples)
| Escenario | Estado | Descripción |
|-----------|--------|-------------|
| TC-04.1 | ✅ PASÓ | Sports + Music sin Subject |
| TC-04.2 | ❌ FALLÓ | Reading + Music con Subject Math (BUG) |
| TC-04.3 | ⏳ PENDIENTE | Todos los Hobbies |
| TC-04.4 | ⏳ PENDIENTE | Reading + Music con Math + Physics |

---

## Casos de Prueba Implementados

### TC-01: Registro Exitoso con Campos Mínimos (Smoke Test)
**Técnica:** Partición de Equivalencia (Clase Válida)

**Objetivo:** Verificar que el formulario se envía correctamente solo con los campos obligatorios.

**Datos de Prueba:**
- Nombre: "Ana"
- Apellido: "Lopez"
- Gender: "Female"
- Mobile: "3101234567"

**Pasos:**
1. Ingresar datos válidos en Name, Last Name
2. Seleccionar Gender
3. Ingresar Mobile (10 dígitos)
4. Dejar el resto vacío
5. Clic en Submit

**Resultado Esperado:** Aparece el modal "Thanks for submitting the form" mostrando los datos ingresados.

**Resultado Obtenido:** ✅ El modal se mostró correctamente con el título "Thanks for submitting the form" y los datos ingresados fueron validados exitosamente.

**Estado:** ✅ PASÓ
**Tiempo de Ejecución:** 25.49s

---

### TC-02: Validación de Longitud Mínima en Celular (BVA Min-1)
**Técnica:** Análisis de Valores Límite (Boundary Value Analysis)

**Objetivo:** Verificar el comportamiento con un número de teléfono incompleto.

**Datos de Prueba:**
- Mobile: "123456789" (9 dígitos)

**Pasos:**
1. Llenar todos los campos obligatorios excepto Mobile
2. En Mobile, ingresar solo 9 dígitos
3. Clic en Submit

**Resultado Esperado:** El formulario NO se envía. El campo Mobile muestra un borde rojo (indicador de error de validación HTML/CSS).

**Resultado Obtenido:** ✅ El formulario no se envió y el campo Mobile mostró correctamente el borde rojo indicando error de validación.

**Estado:** ✅ PASÓ
**Tiempo de Ejecución:** 5.90s

---

### TC-03: Validación de Longitud Máxima en Celular (BVA Max+1)
**Técnica:** Análisis de Valores Límite

**Objetivo:** Verificar si el campo permite más de 10 dígitos.

**Datos de Prueba:**
- Mobile: "12345678901" (11 dígitos)

**Pasos:**
1. Intentar escribir 11 dígitos en el campo Mobile
2. Observar si el campo trunca la entrada
3. Clic en Submit

**Resultado Esperado:** El sistema debe impedir escribir el dígito 11 o el formulario no debe enviarse si logra escribirse.

**Resultado Obtenido:** ✅ El campo Mobile truncó correctamente la entrada a 10 dígitos, impidiendo escribir el dígito adicional.

**Estado:** ✅ PASÓ
**Tiempo de Ejecución:** 3.06s

---

### TC-04: Verificación de Selección Múltiple de Hobbies (Pruebas Combinatorias)
**Técnica:** Pruebas Combinatorias - Múltiples Escenarios

**Objetivo:** Validar que al seleccionar múltiples hobbies en diferentes combinaciones con Subjects, todos se reflejen correctamente en el reporte final.

---

#### TC-04.1: Hobbies Sports + Music (sin Subject)

**Datos de Prueba:**
- Nombre: "Maria", Apellido: "Garcia"
- Gender: "Female", Mobile: "3209876543"
- Hobbies: "Sports" y "Music"
- Subjects: (vacío)

**Pasos:**
1. Llenar campos obligatorios (Name, Gender, Mobile)
2. En la sección Hobbies, seleccionar checkbox "Sports"
3. Seleccionar checkbox "Music"
4. No seleccionar ningún Subject
5. Clic en Submit

**Resultado Esperado:** La fila "Hobbies" debe mostrar "Sports, Music".

**Resultado Obtenido:** ✅ El modal mostró correctamente "Sports, Music" en la fila de Hobbies.

**Estado:** ✅ PASÓ

---

#### TC-04.2: Hobbies Reading + Music con Subject Math (BUG REPORTADO)

**Datos de Prueba:**
- Nombre: "Carlos", Apellido: "Martinez"
- Gender: "Male", Mobile: "3156789012"
- Subject: "Math"
- Hobbies: "Reading" y "Music"

**Pasos:**
1. Llenar campos obligatorios (Name, Gender, Mobile)
2. En Subjects, escribir "Math" y presionar Enter
3. En la sección Hobbies, seleccionar checkbox "Reading"
4. Seleccionar checkbox "Music"
5. Clic en Submit

**Resultado Esperado:** La fila "Hobbies" debe mostrar "Reading, Music".

**Resultado Obtenido:** ❌ **BUG DETECTADO** - El campo Hobbies aparece vacío en el modal a pesar de tener ambos checkboxes seleccionados.

**Estado:** ❌ FALLÓ (Bug de aplicación)

---

#### TC-04.3: Todos los Hobbies (Sports + Reading + Music)

**Datos de Prueba:**
- Nombre: "Laura", Apellido: "Sanchez"
- Gender: "Female", Mobile: "3001234567"
- Hobbies: "Sports", "Reading" y "Music"

**Pasos:**
1. Llenar campos obligatorios (Name, Gender, Mobile)
2. Seleccionar los tres checkboxes de Hobbies
3. Clic en Submit

**Resultado Esperado:** La fila "Hobbies" debe mostrar "Sports, Reading, Music".

**Resultado Obtenido:** ⏳ Pendiente de ejecución

**Estado:** ⏳ PENDIENTE

---

#### TC-04.4: Hobbies Reading + Music con Subjects Math y Physics

**Datos de Prueba:**
- Nombre: "Pedro", Apellido: "Lopez"
- Gender: "Male", Mobile: "3187654321"
- Subjects: "Math" y "Physics"
- Hobbies: "Reading" y "Music"

**Pasos:**
1. Llenar campos obligatorios (Name, Gender, Mobile)
2. En Subjects, agregar "Math" y "Physics"
3. Seleccionar checkboxes "Reading" y "Music"
4. Clic en Submit

**Resultado Esperado:** 
- Fila "Hobbies": "Reading, Music"
- Fila "Subjects": "Math, Physics"

**Resultado Obtenido:** ⏳ Pendiente de ejecución

**Estado:** ⏳ PENDIENTE

---

### TC-05: Validación de Formato de Email (Expresiones Regulares)
**Técnica:** Partición de Equivalencia (Clase Inválida)

**Objetivo:** Asegurar que el campo email rechace formatos sin dominio.

**Datos de Prueba:**
- Email: "usuario@dominio" (sin .com o extensión)

**Pasos:**
1. Llenar campos obligatorios
2. En Email, ingresar "test@test"
3. Clic en Submit

**Resultado Esperado:** El campo Email se resalta en rojo y no permite el envío.

**Resultado Obtenido:** ✅ El campo Email se resaltó correctamente en rojo y el formulario no permitió el envío con un email inválido.

**Estado:** ✅ PASÓ
**Tiempo de Ejecución:** 4.82s

---

### TC-06: Selección de Fecha de Nacimiento (Calendario Dinámico)
**Técnica:** Manejo de elementos dinámicos

**Objetivo:** Verificar la selección de una fecha específica usando el widget de calendario.

**Datos de Prueba:**
- Fecha: "30 May 2000"

**Pasos:**
1. Clic en el campo Date of Birth
2. En el selector de año, elegir "2000"
3. En el selector de mes, elegir "May"
4. Clic en el día "30"
5. Verificar que el campo input muestre "30 May 2000"

**Resultado Esperado:** La fecha se selecciona y se muestra correctamente en el input y en el modal final.

**Resultado Obtenido:** ✅ El calendario dinámico funcionó correctamente. La fecha "30 May 2000" se seleccionó y se mostró tanto en el input como en el modal de confirmación.

**Estado:** ✅ PASÓ
**Tiempo de Ejecución:** 5.58s

---

### TC-07: Dependencia de Estado y Ciudad
**Técnica:** Pruebas Combinatorias / Lógica de Negocio

**Objetivo:** Verificar que las ciudades correspondan al estado seleccionado.

**Datos de Prueba:**
- State: "Uttar Pradesh"
- City Esperada: "Agra"

**Pasos:**
1. Hacer scroll al final del formulario
2. Seleccionar State: "Uttar Pradesh"
3. Clic en el dropdown City
4. Verificar que las opciones incluyan "Agra", "Lucknow", "Merrut"
5. Seleccionar "Agra"
6. Enviar formulario

**Resultado Esperado:** El formulario se envía y el modal muestra State "Uttar Pradesh" y City "Agra".

**Resultado Obtenido:** ❌ **FALLO - Error de Localizador Ambiguo**

El test falló debido a un error de "strict mode violation" en Playwright. El localizador `text=Agra` resolvió a 2 elementos en el DOM:

1. `<p id="aria-context">option Agra focused, 1 of 3...</p>` - Elemento de accesibilidad (ARIA)
2. `<div class="css-1n7v3ny-option">Agra</div>` - Opción real del dropdown

**Mensaje de Error:**
```
Error: expect(locator).toBeVisible() failed
Locator: locator('text=Agra')
Expected: visible
Error: strict mode violation: locator('text=Agra') resolved to 2 elements
```

**Ubicación del Error:** Línea 191 del archivo `automation-practice-form.spec.js`

**Solución Sugerida:** Usar un localizador más específico como:
- `getByText('Agra', { exact: true })`
- `locator('#react-select-4-option-0')`
- `locator('.css-1n7v3ny-option:has-text("Agra")')`

**Estado:** ❌ FALLÓ
**Tiempo de Ejecución:** 4.75s

---

## Notas Técnicas

### Técnicas de Prueba Utilizadas
| Técnica | Casos que la aplican |
|---------|---------------------|
| Partición de Equivalencia | TC-01, TC-05 |
| Análisis de Valores Límite (BVA) | TC-02, TC-03 |
| Pruebas Combinatorias | TC-04, TC-07 |
| Manejo de Elementos Dinámicos | TC-06 |

### Librerías y Herramientas
- **Playwright v1.57.0**: Framework de automatización
- **Node.js v24.13.0**: Entorno de ejecución
- **Chromium Headless**: Navegador de pruebas

### Configuración
- Timeout de test: 60 segundos
- Timeout de expect: 10 segundos
- Modo: Headless (sin interfaz gráfica)

### Comandos Útiles
```bash
# Ejecutar todos los tests
npm test

# Ejecutar tests con UI visual
npm run test:ui

# Ejecutar tests con navegador visible
npm run test:headed

# Ver reporte HTML
npx playwright show-report

# Regenerar solo la documentación
npm run docs
```

---

**Generado automáticamente el 14/1/2026, 16:49:07**
