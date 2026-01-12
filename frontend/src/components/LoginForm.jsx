// في ملف src/components/LoginForm.jsx
import { useState } from "react";
import api from "../services/api"; // استيراد نسخة axios المهيأة

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault(); // منع إعادة تحميل الصفحة الافتراضية عند إرسال النموذج
    setLoading(true);
    setError("");
    setLoading(true);

    try {
      await api.get("sanctum/csrf-cookie");
      console.log("CSRF cookie received.");
      const response = await api.post("api/login", {
        data: { email: email, password: password },
      });
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>تسجيل الدخول</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div>
        <label htmlFor="email">البريد الإلكتروني:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">كلمة المرور:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit" disabled={loading}>
        {loading ? "جاري التحميل..." : "تسجيل الدخول"}
      </button>
    </form>
  );
};

export default LoginForm;
