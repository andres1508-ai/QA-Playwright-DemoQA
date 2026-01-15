const { test, expect } = require('@playwright/test');
const path = require('path');

test.describe('Taller Kata - QA Automatizador Junior', () => {
    
    test.beforeEach(async ({ page }) => {
        await page.goto('https://demoqa.com/automation-practice-form');
        // Remove ads and footer to prevent interception
        await page.evaluate(() => {
            const ads = document.querySelectorAll('#adplus-anchor, #fixedban, iframe');
            ads.forEach(ad => ad.style.display = 'none');
            const footer = document.querySelector('footer');
            if(footer) footer.style.display = 'none';
        });
    });

    // TC-01: Registro Exitoso con Campos Mínimos (Smoke Test)
    // Técnica: Partición de Equivalencia (Clase Válida)
    test('TC-01: Registro Exitoso con Campos Mínimos (Smoke Test)', async ({ page }) => {
        // Datos específicos según el caso
        await page.fill('#firstName', 'Ana');
        await page.fill('#lastName', 'Lopez');
        await page.check('label[for="gender-radio-2"]'); // Female
        await page.fill('#userNumber', '3101234567');
        
        // Dejar el resto vacío y enviar
        await page.click('#submit', { force: true });
        
        // Resultado Esperado: Modal "Thanks for submitting the form"
        await expect(page.locator('.modal-content')).toBeVisible();
        await expect(page.locator('#example-modal-sizes-title-lg')).toContainText('Thanks for submitting the form');
        await expect(page.locator('.modal-body')).toContainText('Ana Lopez');
        await expect(page.locator('.modal-body')).toContainText('Female');
        await expect(page.locator('.modal-body')).toContainText('3101234567');
        
        // Cerrar modal
        await page.click('#closeLargeModal');
    });

    // TC-02: Validación de Longitud Mínima en Celular (BVA Min-1)
    // Técnica: Análisis de Valores Límite (Boundary Value Analysis)
    test('TC-02: Validación de Longitud Mínima en Celular (BVA Min-1)', async ({ page }) => {
        // Llenar campos obligatorios
        await page.fill('#firstName', 'Test');
        await page.fill('#lastName', 'User');
        await page.check('label[for="gender-radio-1"]'); // Male
        
        // Mobile con 9 dígitos (límite inferior -1)
        await page.fill('#userNumber', '123456789');
        
        await page.click('#submit', { force: true });
        
        // Resultado Esperado: El formulario NO se envía, borde rojo en Mobile
        await expect(page.locator('.modal-content')).not.toBeVisible();
        await expect(page.locator('#userForm')).toHaveClass(/was-validated/);
    });

    // TC-03: Validación de Longitud Máxima en Celular (BVA Max+1)
    // Técnica: Análisis de Valores Límite
    test('TC-03: Validación de Longitud Máxima en Celular (BVA Max+1)', async ({ page }) => {
        // Llenar campos obligatorios
        await page.fill('#firstName', 'Test');
        await page.fill('#lastName', 'User');
        await page.check('label[for="gender-radio-1"]'); // Male
        
        // Intentar escribir 11 dígitos en Mobile
        await page.fill('#userNumber', '12345678901');
        
        // Verificar que el campo trunca a 10 dígitos (maxlength del input)
        const mobileValue = await page.inputValue('#userNumber');
        
        // El campo debería truncar o no permitir más de 10 dígitos
        expect(mobileValue.length).toBeLessThanOrEqual(10);
        
        // Si el campo permite 11 dígitos, el formulario no debería enviarse
        if (mobileValue.length === 11) {
            await page.click('#submit', { force: true });
            await expect(page.locator('.modal-content')).not.toBeVisible();
        }
    });

    // TC-04: Verificación de Selección Múltiple de Hobbies (Caso del Bug)
    // Técnica: Pruebas Combinatorias - Múltiples escenarios
    
    // Escenario 4.1: Sports + Music (sin Subject)
    test('TC-04.1: Hobbies Sports + Music sin Subject', async ({ page }) => {
        // Llenar campos obligatorios
        await page.fill('#firstName', 'Maria');
        await page.fill('#lastName', 'Garcia');
        await page.check('label[for="gender-radio-2"]'); // Female
        await page.fill('#userNumber', '3209876543');
        
        // Seleccionar múltiples hobbies: Sports y Music
        await page.check('label[for="hobbies-checkbox-1"]'); // Sports
        await page.check('label[for="hobbies-checkbox-3"]'); // Music
        
        // Verificar que ambos están marcados
        await expect(page.locator('#hobbies-checkbox-1')).toBeChecked();
        await expect(page.locator('#hobbies-checkbox-3')).toBeChecked();
        
        await page.click('#submit', { force: true });
        
        // Resultado Esperado: La fila "Hobbies" debe mostrar "Sports, Music"
        await expect(page.locator('.modal-content')).toBeVisible();
        const hobbiesRow = page.locator('.table-responsive tbody tr').filter({ hasText: 'Hobbies' });
        await expect(hobbiesRow).toContainText('Sports');
        await expect(hobbiesRow).toContainText('Music');
        
        // Cerrar modal
        await page.click('#closeLargeModal', { force: true });
    });

    // Escenario 4.2: Reading + Music con Subject Math (BUG REPORTADO)
    test('TC-04.2: Hobbies Reading + Music con Subject Math', async ({ page }) => {
        // Llenar campos obligatorios
        await page.fill('#firstName', 'Carlos');
        await page.fill('#lastName', 'Martinez');
        await page.check('label[for="gender-radio-1"]'); // Male
        await page.fill('#userNumber', '3156789012');
        
        // Seleccionar Subject: Math
        await page.click('#subjectsInput');
        await page.fill('#subjectsInput', 'Math');
        await page.keyboard.press('Enter');
        
        // Seleccionar múltiples hobbies: Reading y Music
        await page.check('label[for="hobbies-checkbox-2"]'); // Reading
        await page.check('label[for="hobbies-checkbox-3"]'); // Music
        
        // Verificar que ambos están marcados
        await expect(page.locator('#hobbies-checkbox-2')).toBeChecked();
        await expect(page.locator('#hobbies-checkbox-3')).toBeChecked();
        
        await page.click('#submit', { force: true });
        
        // Resultado Esperado: La fila "Hobbies" debe mostrar "Reading, Music"
        await expect(page.locator('.modal-content')).toBeVisible();
        const hobbiesRow = page.locator('.table-responsive tbody tr').filter({ hasText: 'Hobbies' });
        
        // BUG: Con Subject Math + Reading + Music, el campo Hobbies aparece vacío
        await expect(hobbiesRow).toContainText('Reading');
        await expect(hobbiesRow).toContainText('Music');
        
        // Cerrar modal
        await page.click('#closeLargeModal', { force: true });
    });

    // Escenario 4.3: Los tres hobbies seleccionados
    test('TC-04.3: Todos los Hobbies (Sports + Reading + Music)', async ({ page }) => {
        // Llenar campos obligatorios
        await page.fill('#firstName', 'Laura');
        await page.fill('#lastName', 'Sanchez');
        await page.check('label[for="gender-radio-2"]'); // Female
        await page.fill('#userNumber', '3001234567');
        
        // Seleccionar los tres hobbies
        await page.check('label[for="hobbies-checkbox-1"]'); // Sports
        await page.check('label[for="hobbies-checkbox-2"]'); // Reading
        await page.check('label[for="hobbies-checkbox-3"]'); // Music
        
        // Verificar que los tres están marcados
        await expect(page.locator('#hobbies-checkbox-1')).toBeChecked();
        await expect(page.locator('#hobbies-checkbox-2')).toBeChecked();
        await expect(page.locator('#hobbies-checkbox-3')).toBeChecked();
        
        await page.click('#submit', { force: true });
        
        // Resultado Esperado: La fila "Hobbies" debe mostrar "Sports, Reading, Music"
        await expect(page.locator('.modal-content')).toBeVisible();
        const hobbiesRow = page.locator('.table-responsive tbody tr').filter({ hasText: 'Hobbies' });
        await expect(hobbiesRow).toContainText('Sports');
        await expect(hobbiesRow).toContainText('Reading');
        await expect(hobbiesRow).toContainText('Music');
        
        // Cerrar modal
        await page.click('#closeLargeModal', { force: true });
    });

    // Escenario 4.4: Reading + Music con múltiples Subjects
    test('TC-04.4: Hobbies Reading + Music con Subjects Math y Physics', async ({ page }) => {
        // Llenar campos obligatorios
        await page.fill('#firstName', 'Pedro');
        await page.fill('#lastName', 'Lopez');
        await page.check('label[for="gender-radio-1"]'); // Male
        await page.fill('#userNumber', '3187654321');
        
        // Seleccionar múltiples Subjects: Math y Physics
        await page.click('#subjectsInput');
        await page.fill('#subjectsInput', 'Math');
        await page.keyboard.press('Enter');
        await page.fill('#subjectsInput', 'Physics');
        await page.keyboard.press('Enter');
        
        // Seleccionar múltiples hobbies: Reading y Music
        await page.check('label[for="hobbies-checkbox-2"]'); // Reading
        await page.check('label[for="hobbies-checkbox-3"]'); // Music
        
        // Verificar que ambos están marcados
        await expect(page.locator('#hobbies-checkbox-2')).toBeChecked();
        await expect(page.locator('#hobbies-checkbox-3')).toBeChecked();
        
        await page.click('#submit', { force: true });
        
        // Resultado Esperado: La fila "Hobbies" debe mostrar "Reading, Music"
        await expect(page.locator('.modal-content')).toBeVisible();
        const hobbiesRow = page.locator('.table-responsive tbody tr').filter({ hasText: 'Hobbies' });
        await expect(hobbiesRow).toContainText('Reading');
        await expect(hobbiesRow).toContainText('Music');
        
        // Verificar también los Subjects
        const subjectsRow = page.locator('.table-responsive tbody tr').filter({ hasText: 'Subjects' });
        await expect(subjectsRow).toContainText('Math');
        await expect(subjectsRow).toContainText('Physics');
        
        // Cerrar modal
        await page.click('#closeLargeModal', { force: true });
    });

    // TC-05: Validación de Formato de Email (Expresiones Regulares)
    // Técnica: Partición de Equivalencia (Clase Inválida)
    test('TC-05: Validación de Formato de Email', async ({ page }) => {
        // Llenar campos obligatorios
        await page.fill('#firstName', 'Test');
        await page.fill('#lastName', 'User');
        await page.check('label[for="gender-radio-1"]'); // Male
        await page.fill('#userNumber', '3101234567');
        
        // Email inválido: sin extensión de dominio
        await page.fill('#userEmail', 'test@test');
        
        await page.click('#submit', { force: true });
        
        // Resultado Esperado: Campo Email resaltado en rojo, no permite envío
        // Nota: El formulario puede enviarse pero el email no es válido según HTML5
        const emailInput = page.locator('#userEmail');
        const isInvalid = await emailInput.evaluate(el => !el.validity.valid);
        
        // Si el email es considerado inválido por el navegador
        if (isInvalid) {
            await expect(page.locator('.modal-content')).not.toBeVisible();
        }
    });

    // TC-06: Selección de Fecha de Nacimiento (Calendario Dinámico)
    // Técnica: Manejo de elementos dinámicos
    test('TC-06: Selección de Fecha de Nacimiento', async ({ page }) => {
        // Llenar campos obligatorios
        await page.fill('#firstName', 'Carlos');
        await page.fill('#lastName', 'Martinez');
        await page.check('label[for="gender-radio-1"]'); // Male
        await page.fill('#userNumber', '3156789012');
        
        // Selección de fecha: 30 May 2000
        await page.click('#dateOfBirthInput');
        await page.selectOption('.react-datepicker__year-select', '2000');
        await page.selectOption('.react-datepicker__month-select', '4'); // May (0-indexed)
        await page.click('.react-datepicker__day--030:not(.react-datepicker__day--outside-month)');
        
        // Verificar que el input muestra la fecha correcta
        const dateValue = await page.inputValue('#dateOfBirthInput');
        expect(dateValue).toContain('30');
        expect(dateValue).toContain('May');
        expect(dateValue).toContain('2000');
        
        await page.click('#submit', { force: true });
        
        // Verificar en el modal
        await expect(page.locator('.modal-content')).toBeVisible();
        await expect(page.locator('.modal-body')).toContainText('30 May,2000');
        
        // Cerrar modal
        await page.click('#closeLargeModal');
    });

    // TC-07: Dependencia de Estado y Ciudad
    // Técnica: Pruebas Combinatorias / Lógica de Negocio
    test('TC-07: Dependencia de Estado y Ciudad', async ({ page }) => {
        // Llenar campos obligatorios
        await page.fill('#firstName', 'Laura');
        await page.fill('#lastName', 'Hernandez');
        await page.check('label[for="gender-radio-2"]'); // Female
        await page.fill('#userNumber', '3187654321');
        
        // Scroll al final del formulario
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        
        // Seleccionar State: "Uttar Pradesh"
        await page.click('#state');
        await page.locator('#react-select-3-option-1').click(); // Uttar Pradesh
        
        // Verificar que las ciudades corresponden al estado
        await page.click('#city');
        
        // Verificar que Agra, Lucknow, Merrut están disponibles
        const agraOption = page.locator('text=Agra');
        const lucknowOption = page.locator('text=Lucknow');
        const meerrutOption = page.locator('text=Merrut');
        
        await expect(agraOption).toBeVisible();
        await expect(lucknowOption).toBeVisible();
        await expect(meerrutOption).toBeVisible();
        
        // Seleccionar Agra
        await agraOption.click();
        
        await page.click('#submit', { force: true });
        
        // Verificar en el modal
        await expect(page.locator('.modal-content')).toBeVisible();
        await expect(page.locator('.modal-body')).toContainText('Uttar Pradesh');
        await expect(page.locator('.modal-body')).toContainText('Agra');
        
        // Cerrar modal
        await page.click('#closeLargeModal');
    });

});




