 * api.js — API helpers for communicating with the backend
 */

const API_BASE = import.meta.env.VITE_API_URL || '';

export async function fetchProjects() {
  try {
    const res = await fetch(`${API_BASE}/api/projects`);
    if (!res.ok) throw new Error('Failed to fetch projects');
    return await res.json();
  } catch (error) {
    console.error('API Error:', error);
    return [];
  }
}

export async function likeProject(id) {
  try {
    const res = await fetch(`${API_BASE}/api/projects/${id}/like`, {
      method: 'POST',
    });
    if (!res.ok) throw new Error('Failed to like project');
    return await res.json(); // returns { likes: number }
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

export async function submitMessage(data) {
  try {
    const res = await fetch(`${API_BASE}/api/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || 'Failed to send message');
    }
    
    return await res.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}
