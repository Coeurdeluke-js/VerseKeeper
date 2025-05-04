import React, { createContext, useState, useEffect } from 'react';
import { supabase } from '../supabase/supabaseClient';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  useEffect(() => {
    // Verificar sesión actual
    const checkSession = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error al verificar la sesión:', error.message);
          setAuthError('Error al verificar la sesión');
        } else {
          setUser(data.session?.user || null);
        }
      } catch (error) {
        console.error('Error inesperado:', error.message);
        setAuthError('Error inesperado al verificar la sesión');
      } finally {
        setLoading(false);
      }
    };
    
    checkSession();

    // Escuchar cambios en la autenticación
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user || null);
        setLoading(false);
      }
    );

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      setAuthError(null);
      
      console.log("Iniciando sesión con Google...");
      
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      });
      
      if (error) {
        console.error('Error al iniciar sesión con Google:', error.message);
        setAuthError(getErrorMessage(error.message));
        throw error;
      }
    } catch (error) {
      console.error('Error inesperado al iniciar sesión:', error.message);
      setAuthError('Error inesperado al iniciar sesión');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      setAuthError(null);
      
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error('Error al cerrar sesión:', error.message);
        setAuthError('Error al cerrar sesión');
        throw error;
      }
    } catch (error) {
      console.error('Error inesperado al cerrar sesión:', error.message);
      setAuthError('Error inesperado al cerrar sesión');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Función para obtener mensajes de error amigables
  const getErrorMessage = (errorMessage) => {
    if (errorMessage.includes('network')) {
      return 'Error de conexión. Verifica tu conexión a internet.';
    } else if (errorMessage.includes('popup')) {
      return 'El inicio de sesión fue cancelado o bloqueado por el navegador.';
    } else if (errorMessage.includes('timeout')) {
      return 'La solicitud ha tardado demasiado. Inténtalo de nuevo.';
    } else {
      return 'Error al iniciar sesión. Por favor, inténtalo de nuevo.';
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, authError, signInWithGoogle, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;