import { useState, useEffect } from "react";
import { Authenticated, Refine } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { AuthPage, ErrorComponent, RefineThemes, ThemedLayout, useNotificationProvider } from "@refinedev/antd";
import { App as AntdApp, ConfigProvider, theme } from "antd";
import routerProvider, { CatchAllNavigate, NavigateToResource, UnsavedChangesNotifier } from "@refinedev/react-router";
import { BrowserRouter, Route, Routes, Outlet, Navigate } from "react-router-dom";
import { dataProvider } from "@refinedev/supabase";

import { supabaseClient } from "./utility/supabaseClient";
import { authProvider } from "./utility/authProvider";

// ธีมสี Dark Mode สไตล์เรียบหรูระดับพรีเมียม (Midnight Blue & Cyan)
const customTheme = {
  ...RefineThemes.Blue,
  algorithm: theme.darkAlgorithm,
  token: {
    ...RefineThemes.Blue.token,
    colorPrimary: "#00f0ff", // สีฟ้านีออนโดดเด่น
    colorBgBase: "#0b0f19",  // พื้นหลังสีน้ำเงินเข้มจัดดูสวยงาม
    borderRadius: 8,
    fontFamily: "'Inter', sans-serif",
  },
};

function App() {
  const [hasAdmin, setHasAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    // เช็คจำนวน Profile ในตารางเพื่อดูว่ามี Admin คนแรกหรือยัง
    supabaseClient
      .from("profiles")
      .select("id", { count: "exact", head: true })
      .then(({ count, error }) => {
        if (!error && count !== null) {
          setHasAdmin(count > 0);
        } else {
          setHasAdmin(false);
        }
      });
  }, []);

  return (
    <BrowserRouter>
      <ConfigProvider theme={customTheme}>
        <AntdApp>
          <DevtoolsProvider>
            <Refine
              dataProvider={dataProvider(supabaseClient)}
              authProvider={authProvider}
              routerProvider={routerProvider}
              notificationProvider={useNotificationProvider}
              resources={[
                {
                  name: "documents",
                  list: "/documents",
                  meta: {
                    canDelete: true,
                  },
                },
              ]}
              options={{
                syncWithLocation: true,
                warnWhenUnsavedChanges: true,
              }}
            >
              <Routes>
                {/* เมนูหลักที่ต้องผ่านสิทธิ์ล็อกอิน */}
                <Route
                  element={
                    <Authenticated key="authenticated-routes" fallback={<CatchAllNavigate to="/login" />}>
                      <ThemedLayout
                        Title={({ collapsed }) => (
                          <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "5px" }}>
                            <img src="/logo.png" alt="Logo" style={{ height: "24px" }} />
                            {!collapsed && <span style={{ fontWeight: "bold", color: "#00f0ff" }}>LowcodeProject</span>}
                          </div>
                        )}
                      >
                        <Outlet />
                      </ThemedLayout>
                    </Authenticated>
                  }
                >
                  {/* หน้าเริ่มต้นเมื่อเปิดเข้ามา จะส่งไปหน้ารายการเอกสาร */}
                  <Route index element={<NavigateToResource resource="documents" />} />
                  
                  {/* หน้ารายการจำลอง (สำหรับแสดงตารางเอกสารแยกแผนก) */}
                  <Route path="/documents" element={
                    <div style={{ padding: "24px" }}>
                      <h1 style={{ color: "#00f0ff" }}>📂 ระบบจัดการเอกสาร (Documents)</h1>
                      <p>หน้าหลักสำหรับนำเข้าไฟล์สแกน ตรวจเช็คข้อมูลที่ถอดความด้วย AI แยกตามแผนกและสิทธิ์</p>
                      <div style={{ padding: "40px", background: "#131929", borderRadius: "12px", border: "1px solid #1f2a45" }}>
                        <h3>🚀 ยินดีต้อนรับสู่ LowcodeProject โดย Unknown-Dev-BUG</h3>
                        <p>ฐานข้อมูลหลังบ้าน Supabase Local และ Docker Stack ทำงานเสร็จสมบูรณ์เรียบร้อยแล้ว</p>
                        <p style={{ color: "#8c9ba5" }}>ขั้นตอนต่อไป: เริ่มพัฒนาส่วนหน้าเชื่อมประมวลผล Gemini AI</p>
                      </div>
                    </div>
                  } />
                </Route>

                {/* หน้าเกี่ยวกับ Authentication */}
                <Route
                  element={
                    <Authenticated key="auth-pages" fallback={<Outlet />}>
                      <NavigateToResource resource="documents" />
                    </Authenticated>
                  }
                >
                  <Route 
                    path="/login" 
                    element={
                      <AuthPage 
                        type="login" 
                        registerLink={hasAdmin ? false : undefined} 
                      />
                    } 
                  />
                  <Route 
                    path="/register" 
                    element={
                      hasAdmin ? (
                        <Navigate to="/login" replace />
                      ) : (
                        <AuthPage type="register" />
                      )
                    } 
                  />
                  <Route path="/forgot-password" element={<AuthPage type="forgotPassword" />} />
                </Route>

                {/* หน้า Error 404 เมื่อไม่พบหน้า */}
                <Route path="*" element={<ErrorComponent />} />
              </Routes>
              <UnsavedChangesNotifier />
            </Refine>
            {/* แสดงปุ่มลอยสำหรับมอนิเตอร์ความเร็วและค่าระบบ */}
            <DevtoolsPanel />
          </DevtoolsProvider>
        </AntdApp>
      </ConfigProvider>
    </BrowserRouter>
  );
}

export default App;
