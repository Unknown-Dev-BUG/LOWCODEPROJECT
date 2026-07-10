import type { AuthProvider } from "@refinedev/core";
import { supabaseClient } from "./supabaseClient";

export const authProvider: AuthProvider = {
  login: async ({ email, password }) => {
    const { error } = await supabaseClient.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      return {
        success: false,
        error: {
          name: "Login Error",
          message: error.message,
        },
      };
    }
    return {
      success: true,
      redirectTo: "/",
    };
  },
  register: async ({ email, password }) => {
    const { error } = await supabaseClient.auth.signUp({
      email,
      password,
    });
    if (error) {
      return {
        success: false,
        error: {
          name: "Register Error",
          message: error.message,
        },
      };
    }
    return {
      success: true,
      redirectTo: "/",
    };
  },
  logout: async () => {
    const { error } = await supabaseClient.auth.signOut();
    if (error) {
      return {
        success: false,
        error: {
          name: "Logout Error",
          message: error.message,
        },
      };
    }
    return {
      success: true,
      redirectTo: "/login",
    };
  },
  onError: async (error) => {
    console.error(error);
    return { error };
  },
  check: async () => {
    const { data: { session } } = await supabaseClient.auth.getSession();
    if (session) {
      return {
        authenticated: true,
      };
    }
    return {
      authenticated: false,
      redirectTo: "/login",
    };
  },
  getPermissions: async () => {
    const { data: { user } } = await supabaseClient.auth.getUser();
    if (user) {
      // In Supabase, custom metadata role or user.role
      return user.app_metadata?.role ?? user.role;
    }
    return null;
  },
  getIdentity: async () => {
    const { data: { user } } = await supabaseClient.auth.getUser();
    if (user) {
      return {
        id: user.id,
        name: user.email,
        email: user.email,
      };
    }
    return null;
  },
};
