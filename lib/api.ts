const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080';

export async function updateProfile(bio: string) {
  const response = await fetch(`${API_BASE_URL}/users/profile`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify({ bio }),
  });
  if (!response.ok) {
    throw new Error('Failed to update profile');
  }
  return response.json();
}

export async function updateAvatar(file: File) {
  const formData = new FormData();
  formData.append('avatar', file);

  const response = await fetch(`${API_BASE_URL}/users/avatar`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
    body: formData,
  });
  if (!response.ok) {
    throw new Error('Failed to update avatar');
  }
  return response.json();
}

export async function deleteAccount() {
  const response = await fetch(`${API_BASE_URL}/users/account`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  });
  if (!response.ok) {
    throw new Error('Failed to delete account');
  }
  return response.json();
}