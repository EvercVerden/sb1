"use client";

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080';

export function SignInDialog({ open, onOpenChange, onSignInSuccess }) {
  const [isSignIn, setIsSignIn] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    const url = isSignIn ? `${API_BASE_URL}/users/login` : `${API_BASE_URL}/users/register`;
    const body = isSignIn ? { email, password } : { username, email, password };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (response.ok) {
        if (isSignIn) {
          setMessage(`登录成功，用户ID: ${data.user_id}`);
          localStorage.setItem('token', data.token);
          localStorage.setItem('session_id', data.session_id);
          onSignInSuccess(data);
          onOpenChange(false);
        } else {
          setMessage(data.message);
        }
      } else {
        setError(data.error || '操作失败');
      }
    } catch (error) {
      setError('发生错误，请稍后重试。');
    }
  };

  // ... 其余代码保持不变
}