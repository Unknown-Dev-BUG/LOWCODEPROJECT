import { Refine } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineThemes, ThemedLayout, useNotificationProvider } from "@refinedev/antd";
import { App as AntdApp, ConfigProvider, theme } from "antd";
import routerProvider, { NavigateToResource, UnsavedChangesNotifier } from "@refinedev/react-router";
import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";
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
