import React, { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';
import { supabase } from '../supabase/supabaseClient';

const AuthCallback = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [isProcessing, setIsProcessing] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    // Procesar explícitamente el callback de autenticación
    const handleAuthCallback = async () => {
      try {
        setIsProcessing(true);
        
        // Obtener los parámetros de la URL
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        
        // Si hay un token de acceso en la URL, la autenticación fue exitosa
        if (hashParams.get('access_token')) {
          // Esperar a que Supabase procese la sesión
          const { data, error } = await supabase.auth.getSession();
          
          if (error) {
            console.error('Error al procesar callback de autenticación:', error.message);
            setError('Error al procesar la autenticación');
            navigate('/login');
            return;
          }
          
          if (data.session) {
            console.log('Autenticación exitosa, redirigiendo al dashboard');
            
            // Usar setTimeout para asegurar que la redirección ocurra después de que React haya actualizado el DOM
            setTimeout(() => {
              navigate('/dashboard', { replace: true });
            }, 500);
          } else {
            setError('No se pudo establecer la sesión');
            navigate('/login');
          }
        } else {
          // Si no hay token, verificar si el usuario ya está autenticado
          if (user) {
            setTimeout(() => {
              navigate('/dashboard', { replace: true });
            }, 500);
          } else {
            navigate('/login');
          }
        }
      } catch (error) {
        console.error('Error en el callback de autenticación:', error);
        setError('Error inesperado durante la autenticación');
        navigate('/login');
      } finally {
        setIsProcessing(false);
      }
    };
    
    handleAuthCallback();
  }, [navigate, user]);
  
  if (error) {
    return <div className="auth-error">{error}. Redirigiendo...</div>;
  }
  
  return (
    <div className="auth-processing">
      {isProcessing ? 'Procesando autenticación...' : 'Redirigiendo al dashboard...'}
    </div>
  );
};

export default AuthCallback;