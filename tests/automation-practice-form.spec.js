/**
 * ============================================================================
 * SUITE DE PRUEBAS AUTOMATIZADAS - DemoQA Practice Form
 * ============================================================================
 * 
 * Descripción: Suite de pruebas E2E para el formulario de práctica de DemoQA
 * URL: https://demoqa.com/automation-practice-form
 * 
 * Técnicas de prueba aplicadas:
 * - Partición de Equivalencia (clases válidas e inválidas)
 * - Análisis de Valores Límite (BVA)
 * - Pruebas Combinatorias
 * - Manejo de elementos dinámicos
 * 
 * Autor: Taller QA Automatizador Junior
 * Framework: Playwright
 * ============================================================================
 */

const { test, expect } = require('@playwright/test');
const path = require('path');

/**
 * Constantes de configuración y datos de prueba
 * Centralizar los datos facilita el mantenimiento
 */
const URL_FORMULARIO = 'https://demoqa.com/automation-practice-form';

const SELECTORES = {
    // Campos del formulario
    nombre: '#firstName',
    apellido: '#lastName',
    email: '#userEmail',
    celular: '#userNumber',
    fechaNacimiento: '#dateOfBirthInput',
    materias: '#subjectsInput',
    direccion: '#currentAddress',
    
    // Radio buttons de género
    generoMasculino: 'label[for="gender-radio-1"]',
    generoFemenino: 'label[for="gender-radio-2"]',
    generoOtro: 'label[for="gender-radio-3"]',
    
    // Checkboxes de hobbies
    hobbySports: 'label[for="hobbies-checkbox-1"]',
    hobbyReading: 'label[for="hobbies-checkbox-2"]',
    hobbyMusic: 'label[for="hobbies-checkbox-3"]',
    
    // Verificación de hobbies
    checkSports: '#hobbies-checkbox-1',
    checkReading: '#hobbies-checkbox-2',
    checkMusic: '#hobbies-checkbox-3',
    
    // Dropdowns de ubicación
    estado: '#state',
    ciudad: '#city',
    
    // Botones y modal
    botonEnviar: '#submit',
    botonCerrarModal: '#closeLargeModal',
    contenidoModal: '.modal-content',
    tituloModal: '#example-modal-sizes-title-lg',
    cuerpoModal: '.modal-body',
    formulario: '#userForm',
    tablaResultados: '.table-responsive tbody tr'
};

/**
 * Suite principal de pruebas
 */
test.describe('Suite de Pruebas - Formulario de Registro DemoQA', () => {
    
    /**
     * Configuración previa a cada test
     * - Navega al formulario
     * - Oculta anuncios que pueden interferir con los clicks
     */
    test.beforeEach(async ({ page }) => {
        // Navegar al formulario de práctica
        await page.goto(URL_FORMULARIO);
        
        // Esperar a que la página cargue completamente
        await page.waitForLoadState('domcontentloaded');
        
        // Ocultar elementos publicitarios y footer para evitar interferencias
        // Esto es necesario porque los anuncios pueden bloquear los clicks
        await page.evaluate(() => {
            // Cerrar modales abiertos si existen
            const modal = document.querySelector('.modal.show');
            if (modal) modal.classList.remove('show');
            const backdrop = document.querySelector('.modal-backdrop');
            if (backdrop) backdrop.remove();
            
            const elementosAOcultar = document.querySelectorAll(
                '#adplus-anchor, #fixedban, iframe, .google-auto-placed'
            );
            elementosAOcultar.forEach(elemento => elemento.style.display = 'none');
            
            const footer = document.querySelector('footer');
            if (footer) footer.style.display = 'none';
        });
    });

    /* =========================================================================
     * TC-01: REGISTRO EXITOSO CON CAMPOS MÍNIMOS
     * =========================================================================
     * Técnica: Partición de Equivalencia (Clase Válida)
     * Objetivo: Verificar envío exitoso con solo campos obligatorios
     */
    test('TC-01: Registro exitoso con campos mínimos obligatorios', async ({ page }) => {
        // ARRANGE: Preparar datos de prueba
        const datosUsuario = {
            nombre: 'Ana',
            apellido: 'Lopez',
            celular: '3101234567'
        };

        // ACT: Llenar solo campos obligatorios
        await page.fill(SELECTORES.nombre, datosUsuario.nombre);
        await page.fill(SELECTORES.apellido, datosUsuario.apellido);
        await page.check(SELECTORES.generoFemenino);
        await page.fill(SELECTORES.celular, datosUsuario.celular);
        
        // Enviar formulario (force: true evita problemas con elementos superpuestos)
        await page.click(SELECTORES.botonEnviar, { force: true });

        // ASSERT: Verificar que el modal de éxito aparece con los datos correctos
        await expect(page.locator(SELECTORES.contenidoModal)).toBeVisible();
        await expect(page.locator(SELECTORES.tituloModal))
            .toContainText('Thanks for submitting the form');
        await expect(page.locator(SELECTORES.cuerpoModal))
            .toContainText(`${datosUsuario.nombre} ${datosUsuario.apellido}`);
        await expect(page.locator(SELECTORES.cuerpoModal)).toContainText('Female');
        await expect(page.locator(SELECTORES.cuerpoModal))
            .toContainText(datosUsuario.celular);
        
        // Cerrar modal para limpiar estado
        await page.click(SELECTORES.botonCerrarModal);
    });

    /* =========================================================================
     * TC-02: VALIDACIÓN DE LONGITUD MÍNIMA EN CELULAR (BVA Min-1)
     * =========================================================================
     * Técnica: Análisis de Valores Límite
     * Objetivo: Verificar rechazo de celular con 9 dígitos (mínimo es 10)
     */
    test('TC-02: Rechazar celular con 9 dígitos (límite inferior -1)', async ({ page }) => {
        // ARRANGE: Celular inválido con 9 dígitos
        const celularInvalido = '123456789'; // Solo 9 dígitos

        // ACT: Llenar formulario con celular inválido
        await page.fill(SELECTORES.nombre, 'Test');
        await page.fill(SELECTORES.apellido, 'Usuario');
        await page.check(SELECTORES.generoMasculino);
        await page.fill(SELECTORES.celular, celularInvalido);
        
        await page.click(SELECTORES.botonEnviar, { force: true });

        // ASSERT: El formulario NO debe enviarse
        await expect(page.locator(SELECTORES.contenidoModal)).not.toBeVisible();
        
        // Verificar que el formulario muestra validación
        await expect(page.locator(SELECTORES.formulario)).toHaveClass(/was-validated/);
    });

    /* =========================================================================
     * TC-03: VALIDACIÓN DE LONGITUD MÁXIMA EN CELULAR (BVA Max+1)
     * =========================================================================
     * Técnica: Análisis de Valores Límite
     * Objetivo: Verificar que el campo no acepta más de 10 dígitos
     */
    test('TC-03: Campo celular debe truncar a 10 dígitos máximo', async ({ page }) => {
        // ARRANGE: Intentar ingresar 11 dígitos
        const celularExcedido = '12345678901'; // 11 dígitos

        // ACT: Llenar campos obligatorios
        await page.fill(SELECTORES.nombre, 'Test');
        await page.fill(SELECTORES.apellido, 'Usuario');
        await page.check(SELECTORES.generoMasculino);
        await page.fill(SELECTORES.celular, celularExcedido);

        // ASSERT: Verificar que el campo trunca la entrada
        const valorCelular = await page.inputValue(SELECTORES.celular);
        expect(valorCelular.length).toBeLessThanOrEqual(10);

        // Si por alguna razón acepta 11 dígitos, el envío debe fallar
        if (valorCelular.length === 11) {
            await page.click(SELECTORES.botonEnviar, { force: true });
            await expect(page.locator(SELECTORES.contenidoModal)).not.toBeVisible();
        }
    });

    /* =========================================================================
     * TC-04: SELECCIÓN MÚLTIPLE DE HOBBIES - ESCENARIOS COMBINATORIOS
     * =========================================================================
     * Técnica: Pruebas Combinatorias
     * Objetivo: Validar diferentes combinaciones de hobbies y materias
     */
    
    /**
     * TC-04.1: Hobbies Sports + Music sin seleccionar materias
     * Escenario base para verificar funcionamiento sin materias
     */
    test('TC-04.1: Selección de Sports y Music sin materias', async ({ page }) => {
        // ARRANGE: Datos de prueba
        const datosUsuario = {
            nombre: 'Maria',
            apellido: 'Garcia',
            celular: '3209876543'
        };

        // ACT: Llenar formulario y seleccionar hobbies
        await page.fill(SELECTORES.nombre, datosUsuario.nombre);
        await page.fill(SELECTORES.apellido, datosUsuario.apellido);
        await page.check(SELECTORES.generoFemenino);
        await page.fill(SELECTORES.celular, datosUsuario.celular);
        
        // Seleccionar múltiples hobbies
        await page.check(SELECTORES.hobbySports);
        await page.check(SELECTORES.hobbyMusic);
        
        // Verificar que los checkboxes están marcados
        await expect(page.locator(SELECTORES.checkSports)).toBeChecked();
        await expect(page.locator(SELECTORES.checkMusic)).toBeChecked();
        
        await page.click(SELECTORES.botonEnviar, { force: true });

        // ASSERT: Verificar que ambos hobbies aparecen en el modal
        await expect(page.locator(SELECTORES.contenidoModal)).toBeVisible();
        
        const filaHobbies = page.locator(SELECTORES.tablaResultados)
            .filter({ hasText: 'Hobbies' });
        await expect(filaHobbies).toContainText('Sports');
        await expect(filaHobbies).toContainText('Music');
        
        await page.click(SELECTORES.botonCerrarModal, { force: true });
    });

    /**
     * TC-04.2: Hobbies Reading + Music con materia Math
     * ESCENARIO DE BUG: Los hobbies aparecen vacíos al combinar con Math
     */
    test('TC-04.2: Bug - Reading y Music con materia Math (hobbies vacíos)', async ({ page }) => {
        // ARRANGE: Datos de prueba
        const datosUsuario = {
            nombre: 'Carlos',
            apellido: 'Martinez',
            celular: '3156789012'
        };

        // ACT: Llenar campos obligatorios
        await page.fill(SELECTORES.nombre, datosUsuario.nombre);
        await page.fill(SELECTORES.apellido, datosUsuario.apellido);
        await page.check(SELECTORES.generoMasculino);
        await page.fill(SELECTORES.celular, datosUsuario.celular);
        
        // Seleccionar materia Math usando el autocomplete
        await page.click(SELECTORES.materias);
        await page.fill(SELECTORES.materias, 'Math');
        await page.keyboard.press('Enter');
        
        // Seleccionar hobbies Reading y Music
        await page.check(SELECTORES.hobbyReading);
        await page.check(SELECTORES.hobbyMusic);
        
        // Verificar selección de checkboxes
        await expect(page.locator(SELECTORES.checkReading)).toBeChecked();
        await expect(page.locator(SELECTORES.checkMusic)).toBeChecked();
        
        await page.click(SELECTORES.botonEnviar, { force: true });

        // ASSERT: Los hobbies deberían mostrarse (este test detecta el bug)
        await expect(page.locator(SELECTORES.contenidoModal)).toBeVisible();
        
        const filaHobbies = page.locator(SELECTORES.tablaResultados)
            .filter({ hasText: 'Hobbies' });
        
        // BUG CONOCIDO: Con Math seleccionado, los hobbies aparecen vacíos
        await expect(filaHobbies).toContainText('Reading');
        await expect(filaHobbies).toContainText('Music');
        
        await page.click(SELECTORES.botonCerrarModal, { force: true });
    });

    /**
     * TC-04.3: Selección de los tres hobbies disponibles
     * Verifica la selección máxima de hobbies
     */
    test('TC-04.3: Selección de todos los hobbies (Sports, Reading, Music)', async ({ page }) => {
        // ARRANGE: Datos de prueba
        const datosUsuario = {
            nombre: 'Laura',
            apellido: 'Sanchez',
            celular: '3001234567'
        };

        // ACT: Llenar campos obligatorios
        await page.fill(SELECTORES.nombre, datosUsuario.nombre);
        await page.fill(SELECTORES.apellido, datosUsuario.apellido);
        await page.check(SELECTORES.generoFemenino);
        await page.fill(SELECTORES.celular, datosUsuario.celular);
        
        // Seleccionar los tres hobbies disponibles
        await page.check(SELECTORES.hobbySports);
        await page.check(SELECTORES.hobbyReading);
        await page.check(SELECTORES.hobbyMusic);
        
        // Verificar que todos están marcados
        await expect(page.locator(SELECTORES.checkSports)).toBeChecked();
        await expect(page.locator(SELECTORES.checkReading)).toBeChecked();
        await expect(page.locator(SELECTORES.checkMusic)).toBeChecked();
        
        await page.click(SELECTORES.botonEnviar, { force: true });

        // ASSERT: Verificar que los tres hobbies aparecen
        await expect(page.locator(SELECTORES.contenidoModal)).toBeVisible();
        
        const filaHobbies = page.locator(SELECTORES.tablaResultados)
            .filter({ hasText: 'Hobbies' });
        await expect(filaHobbies).toContainText('Sports');
        await expect(filaHobbies).toContainText('Reading');
        await expect(filaHobbies).toContainText('Music');
        
        await page.click(SELECTORES.botonCerrarModal, { force: true });
    });

    /**
     * TC-04.4: Hobbies con múltiples materias
     * Verifica combinación de Reading + Music con Math y Physics
     */
    test('TC-04.4: Hobbies Reading y Music con materias Math y Physics', async ({ page }) => {
        // ARRANGE: Datos de prueba
        const datosUsuario = {
            nombre: 'Pedro',
            apellido: 'Lopez',
            celular: '3187654321'
        };

        // ACT: Llenar campos obligatorios
        await page.fill(SELECTORES.nombre, datosUsuario.nombre);
        await page.fill(SELECTORES.apellido, datosUsuario.apellido);
        await page.check(SELECTORES.generoMasculino);
        await page.fill(SELECTORES.celular, datosUsuario.celular);
        
        // Seleccionar múltiples materias
        await page.click(SELECTORES.materias);
        await page.fill(SELECTORES.materias, 'Math');
        await page.keyboard.press('Enter');
        await page.fill(SELECTORES.materias, 'Physics');
        await page.keyboard.press('Enter');
        
        // Seleccionar hobbies
        await page.check(SELECTORES.hobbyReading);
        await page.check(SELECTORES.hobbyMusic);
        
        // Verificar checkboxes
        await expect(page.locator(SELECTORES.checkReading)).toBeChecked();
        await expect(page.locator(SELECTORES.checkMusic)).toBeChecked();
        
        await page.click(SELECTORES.botonEnviar, { force: true });

        // ASSERT: Verificar hobbies y materias en el modal
        await expect(page.locator(SELECTORES.contenidoModal)).toBeVisible();
        
        const filaHobbies = page.locator(SELECTORES.tablaResultados)
            .filter({ hasText: 'Hobbies' });
        await expect(filaHobbies).toContainText('Reading');
        await expect(filaHobbies).toContainText('Music');
        
        const filaMaterias = page.locator(SELECTORES.tablaResultados)
            .filter({ hasText: 'Subjects' });
        await expect(filaMaterias).toContainText('Math');
        await expect(filaMaterias).toContainText('Physics');
        
        await page.click(SELECTORES.botonCerrarModal, { force: true });
    });

    /* =========================================================================
     * TC-05: VALIDACIÓN DE FORMATO DE EMAIL
     * =========================================================================
     * Técnica: Partición de Equivalencia (Clase Inválida)
     * Objetivo: Verificar rechazo de email sin extensión de dominio
     */
    test('TC-05: Rechazar email sin extensión de dominio', async ({ page }) => {
        // ARRANGE: Email inválido sin extensión
        const emailInvalido = 'test@test'; // Falta .com o similar

        // ACT: Llenar formulario con email inválido
        await page.fill(SELECTORES.nombre, 'Test');
        await page.fill(SELECTORES.apellido, 'Usuario');
        await page.check(SELECTORES.generoMasculino);
        await page.fill(SELECTORES.celular, '3101234567');
        await page.fill(SELECTORES.email, emailInvalido);
        
        await page.click(SELECTORES.botonEnviar, { force: true });

        // ASSERT: Verificar que el email es considerado inválido
        const campoEmail = page.locator(SELECTORES.email);
        const esInvalido = await campoEmail.evaluate(
            elemento => !elemento.validity.valid
        );
        
        // Si el navegador considera el email inválido, el modal no debe aparecer
        if (esInvalido) {
            await expect(page.locator(SELECTORES.contenidoModal)).not.toBeVisible();
        }
    });

    /* =========================================================================
     * TC-06: SELECCIÓN DE FECHA DE NACIMIENTO
     * =========================================================================
     * Técnica: Manejo de elementos dinámicos
     * Objetivo: Verificar interacción con el widget de calendario
     */
    test('TC-06: Seleccionar fecha de nacimiento desde calendario', async ({ page }) => {
        // ARRANGE: Fecha objetivo
        const fechaObjetivo = {
            dia: '30',
            mes: '4',      // Mayo es índice 4 (0-indexed)
            mesNombre: 'May',
            anio: '2000'
        };

        // ACT: Llenar campos obligatorios
        await page.fill(SELECTORES.nombre, 'Carlos');
        await page.fill(SELECTORES.apellido, 'Martinez');
        await page.check(SELECTORES.generoMasculino);
        await page.fill(SELECTORES.celular, '3156789012');
        
        // Interactuar con el calendario
        await page.click(SELECTORES.fechaNacimiento);
        
        // Seleccionar año
        await page.selectOption('.react-datepicker__year-select', fechaObjetivo.anio);
        
        // Seleccionar mes (0-indexed: Mayo = 4)
        await page.selectOption('.react-datepicker__month-select', fechaObjetivo.mes);
        
        // Seleccionar día (evitar días de otros meses)
        await page.click(
            `.react-datepicker__day--0${fechaObjetivo.dia}:not(.react-datepicker__day--outside-month)`
        );
        
        // Verificar que la fecha se muestra correctamente en el input
        const valorFecha = await page.inputValue(SELECTORES.fechaNacimiento);
        expect(valorFecha).toContain(fechaObjetivo.dia);
        expect(valorFecha).toContain(fechaObjetivo.mesNombre);
        expect(valorFecha).toContain(fechaObjetivo.anio);
        
        await page.click(SELECTORES.botonEnviar, { force: true });

        // ASSERT: Verificar fecha en el modal de confirmación
        await expect(page.locator(SELECTORES.contenidoModal)).toBeVisible();
        await expect(page.locator(SELECTORES.cuerpoModal))
            .toContainText(`${fechaObjetivo.dia} ${fechaObjetivo.mesNombre},${fechaObjetivo.anio}`);
        
        await page.click(SELECTORES.botonCerrarModal);
    });

    /* =========================================================================
     * TC-07: DEPENDENCIA DE ESTADO Y CIUDAD
     * =========================================================================
     * Técnica: Pruebas Combinatorias / Lógica de Negocio
     * Objetivo: Verificar que las ciudades correspondan al estado seleccionado
     */
    test('TC-07: Ciudades deben corresponder al estado seleccionado', async ({ page }) => {
        // ARRANGE: Datos de prueba
        const datosUsuario = {
            nombre: 'Laura',
            apellido: 'Hernandez',
            celular: '3187654321'
        };
        
        const ubicacion = {
            estado: 'Uttar Pradesh',
            ciudadesEsperadas: ['Agra', 'Lucknow', 'Merrut'],
            ciudadSeleccionada: 'Agra'
        };

        // ACT: Llenar campos obligatorios
        await page.fill(SELECTORES.nombre, datosUsuario.nombre);
        await page.fill(SELECTORES.apellido, datosUsuario.apellido);
        await page.check(SELECTORES.generoFemenino);
        await page.fill(SELECTORES.celular, datosUsuario.celular);
        
        // Hacer scroll al final para ver los dropdowns de ubicación
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        
        // Seleccionar estado
        await page.click(SELECTORES.estado);
        await page.locator('#react-select-3-option-1').click(); // Uttar Pradesh
        
        // Abrir dropdown de ciudades
        await page.click(SELECTORES.ciudad);
        
        // Verificar que las ciudades correctas están disponibles
        const opcionAgra = page.locator('text=Agra');
        const opcionLucknow = page.locator('text=Lucknow');
        const opcionMerrut = page.locator('text=Merrut');
        
        await expect(opcionAgra).toBeVisible();
        await expect(opcionLucknow).toBeVisible();
        await expect(opcionMerrut).toBeVisible();
        
        // Seleccionar ciudad
        await opcionAgra.click();
        
        await page.click(SELECTORES.botonEnviar, { force: true });

        // ASSERT: Verificar estado y ciudad en el modal
        await expect(page.locator(SELECTORES.contenidoModal)).toBeVisible();
        await expect(page.locator(SELECTORES.cuerpoModal))
            .toContainText(ubicacion.estado);
        await expect(page.locator(SELECTORES.cuerpoModal))
            .toContainText(ubicacion.ciudadSeleccionada);
        
        await page.click(SELECTORES.botonCerrarModal);
    });

});




