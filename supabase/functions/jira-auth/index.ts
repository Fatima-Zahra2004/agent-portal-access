
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { token } = await req.json();

    if (!token) {
      return new Response(
        JSON.stringify({ error: "Token PAT requis" }), 
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    console.log('Tentative d\'authentification avec token JIRA...');

    // Appel à l'API JIRA pour vérifier le token et récupérer les infos de l'agent
    const jiraResponse = await fetch('https://jisr.marocpme.gov.ma/jira/rest/api/2/myself', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      }
    });

    if (!jiraResponse.ok) {
      console.error('Erreur JIRA:', jiraResponse.status, jiraResponse.statusText);
      return new Response(
        JSON.stringify({ error: "Token PAT invalide ou expiré" }), 
        { 
          status: 401, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    const userData = await jiraResponse.json();
    console.log('Authentification réussie pour:', userData.displayName);

    // Retourner les données de l'agent
    return new Response(
      JSON.stringify({
        success: true,
        user: {
          id: userData.accountId,
          name: userData.displayName,
          email: userData.emailAddress,
          role: "agent",
          department: userData.groups?.items?.[0]?.name || "Support Technique",
          phone: userData.phone || "N/A",
          avatar: userData.avatarUrls?.['48x48'] || null,
          jiraKey: userData.key,
          timezone: userData.timeZone
        },
        token: token // On retourne le token pour le stockage local
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error("Erreur lors de la requête à JIRA:", error.message);
    return new Response(
      JSON.stringify({ error: "Impossible de récupérer les données depuis JIRA" }), 
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
})
