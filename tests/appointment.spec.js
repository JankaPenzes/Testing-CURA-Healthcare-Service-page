const base = require("@playwright/test");
import { LoginPage } from "../pages/login.page";
import { AppointmentPage } from "../pages/appointment.page";
const expect = base.expect;
const test = base.test.extend({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goTo();
    await use(loginPage);
    await loginPage.login("John Doe", "ThisIsNotAPassword");
  },
  appointmentPage: async ({ page }, use) => {
    const appointmentPage = new AppointmentPage(page);
    await appointmentPage.waitFor();
    await use(appointmentPage);
  }
});
test.describe("Make appointment", () => {
  test("Make appointment by filling in all fields correctly", async ({appointmentPage}) => {
    await expect(appointmentPage.makeAppointmentButton).toBeVisible();
    await appointmentPage.appointment(
      "Tokyo CURA Healthcare Center",
      "Medicaid",
      "18/12/2023",
      "Digestion problems"
    );
    await expect(message.AppointmentPage).toHaveText(
      "Appointment Confirmation"
    );
  })
});