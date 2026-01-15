const fs = require('fs');
const path = require('path');

// Leer el reporte JSON de Playwright
const jsonReportPath = path.join(__dirname, 'playwright-report', 'report.json');

let testResults = [];

// Intentar leer el reporte JSON si existe
if (fs.existsSync(jsonReportPath)) {
    try {
        const reportData = JSON.parse(fs.readFileSync(jsonReportPath, 'utf8'));
        testResults = reportData.suites?.[0]?.suites?.[0]?.specs || [];
    } catch (e) {
        console.log('No se pudo leer el reporte JSON');
    }
}

// Generar la documentación
const date = new Date().toLocaleString('es-ES');
let markdown = `# Documentación de Casos de Prueba - DemoQA Automation Form

**Última actualización:** ${date}

## Resumen de Ejecución

`;

// Calcular estadísticas
const passed = testResults.filter(t => t.ok).length;
const failed = testResults.filter(t => !t.ok).length;
const total = testResults.length || 7;

markdown += `| Métrica | Valor |
|---------|-------|
| ✅ Tests Pasados | ${passed}/${total} |
| ❌ Tests Fallidos | ${failed}/${total} |
| 📊 Porcentaje de Éxito | ${total > 0 ? Math.round((passed/total)*100) : 0}% |

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

`;

if (testResults[0]) {
    const duration = testResults[0].tests?.[0]?.results?.[0]?.duration;
    markdown += `**Estado:** ${testResults[0].ok ? '✅ PASÓ' : '❌ FALLÓ'}\n`;
    markdown += `**Tiempo de Ejecución:** ${duration ? (duration / 1000).toFixed(2) + 's' : 'N/A'}\n\n`;
} else {
    markdown += `**Estado:** ⏳ Pendiente de ejecución\n\n`;
}

markdown += `---

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

`;

if (testResults[1]) {
    const duration = testResults[1].tests?.[0]?.results?.[0]?.duration;
    markdown += `**Estado:** ${testResults[1].ok ? '✅ PASÓ' : '❌ FALLÓ'}\n`;
    markdown += `**Tiempo de Ejecución:** ${duration ? (duration / 1000).toFixed(2) + 's' : 'N/A'}\n\n`;
} else {
    markdown += `**Estado:** ⏳ Pendiente de ejecución\n\n`;
}

markdown += `---

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

`;

if (testResults[2]) {
    const duration = testResults[2].tests?.[0]?.results?.[0]?.duration;
    markdown += `**Estado:** ${testResults[2].ok ? '✅ PASÓ' : '❌ FALLÓ'}\n`;
    markdown += `**Tiempo de Ejecución:** ${duration ? (duration / 1000).toFixed(2) + 's' : 'N/A'}\n\n`;
} else {
    markdown += `**Estado:** ⏳ Pendiente de ejecución\n\n`;
}

markdown += `---

### TC-04: Verificación de Selección Múltiple de Hobbies (Caso del Bug)
**Técnica:** Pruebas Combinatorias

**Objetivo:** Validar que al seleccionar múltiples hobbies, todos se reflejen en el reporte final.

**Datos de Prueba:**
- Hobbies: "Sports" y "Music"
- Resto de datos obligatorios válidos

**Pasos:**
1. Llenar campos obligatorios (Name, Gender, Mobile)
2. En la sección Hobbies, hacer clic en el checkbox "Sports"
3. Hacer clic en el checkbox "Music" (asegurar que ambos estén marcados)
4. Clic en Submit
5. Inspeccionar la tabla del modal en la fila "Hobbies"

**Resultado Esperado:** La fila "Hobbies" debe mostrar el texto "Sports, Music".

**Resultado Real (si hay fallo):** El modal solo muestra 'Sports' o aparece vacío, ignorando la selección múltiple.

`;

if (testResults[3]) {
    const duration = testResults[3].tests?.[0]?.results?.[0]?.duration;
    markdown += `**Estado:** ${testResults[3].ok ? '✅ PASÓ' : '❌ FALLÓ'}\n`;
    markdown += `**Tiempo de Ejecución:** ${duration ? (duration / 1000).toFixed(2) + 's' : 'N/A'}\n\n`;
} else {
    markdown += `**Estado:** ⏳ Pendiente de ejecución\n\n`;
}

markdown += `---

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

`;

if (testResults[4]) {
    const duration = testResults[4].tests?.[0]?.results?.[0]?.duration;
    markdown += `**Estado:** ${testResults[4].ok ? '✅ PASÓ' : '❌ FALLÓ'}\n`;
    markdown += `**Tiempo de Ejecución:** ${duration ? (duration / 1000).toFixed(2) + 's' : 'N/A'}\n\n`;
} else {
    markdown += `**Estado:** ⏳ Pendiente de ejecución\n\n`;
}

markdown += `---

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

`;

if (testResults[5]) {
    const duration = testResults[5].tests?.[0]?.results?.[0]?.duration;
    markdown += `**Estado:** ${testResults[5].ok ? '✅ PASÓ' : '❌ FALLÓ'}\n`;
    markdown += `**Tiempo de Ejecución:** ${duration ? (duration / 1000).toFixed(2) + 's' : 'N/A'}\n\n`;
} else {
    markdown += `**Estado:** ⏳ Pendiente de ejecución\n\n`;
}

markdown += `---

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

`;

if (testResults[6]) {
    const duration = testResults[6].tests?.[0]?.results?.[0]?.duration;
    markdown += `**Estado:** ${testResults[6].ok ? '✅ PASÓ' : '❌ FALLÓ'}\n`;
    markdown += `**Tiempo de Ejecución:** ${duration ? (duration / 1000).toFixed(2) + 's' : 'N/A'}\n\n`;
} else {
    markdown += `**Estado:** ⏳ Pendiente de ejecución\n\n`;
}

markdown += `---

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
\`\`\`bash
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
\`\`\`

---

**Generado automáticamente el ${date}**
`;

// Escribir el archivo
fs.writeFileSync(path.join(__dirname, 'DOCUMENTACION_CASOS_PRUEBA.md'), markdown, 'utf8');
console.log('✅ Documentación generada exitosamente');
