import { logout as logoutService } from "@/services/auth";

export const logout = async () => {
  try {
    await logoutService();
  } catch (error) {
    console.error("Logout error:", error);
  }
};
