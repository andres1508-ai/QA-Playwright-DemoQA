/**
 * ============================================================================
 * TEST SMOKE - Verificación Básica de Conectividad
 * ============================================================================
 * 
 * Descripción: Test rápido para verificar que el entorno de pruebas funciona
 * correctamente antes de ejecutar la suite completa.
 * 
 * Este test debe ejecutarse primero para confirmar:
 * - Playwright está configurado correctamente
 * - El navegador puede iniciar
 * - Hay conexión a internet
 * ============================================================================
 */

const { test, expect } = require('@playwright/test');

/**
 * Test Smoke: Verificar conectividad básica
 * Navega a example.com y verifica que el título sea correcto
 */
test('Smoke: Verificar conectividad y configuración de Playwright', async ({ page }) => {
    // Navegar a una página de prueba simple
    await page.goto('https://example.com/');
    
    // Verificar que el título de la página sea el esperado
    await expect(page).toHaveTitle(/Example Domain/);
});
