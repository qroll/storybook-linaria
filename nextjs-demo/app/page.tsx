"use client";

import { Button } from "storybook-linaria/button";
import { ButtonV1 } from "storybook-linaria/button-v1";
import "storybook-linaria/button/styles.css";
import { ThemeType } from "storybook-linaria/theme";
import { ThemeProvider, useTheme } from "storybook-linaria/ThemeProvider";

export default function Home() {
  return (
    <ThemeProvider>
      <HomeContent />
    </ThemeProvider>
  );
}

function HomeContent() {
  const { theme, setTheme } = useTheme();

  const handleThemeChange = (theme: ThemeType) => {
    setTheme(theme);
  };
  return (
    <div className="min-h-screen bg-white font-sans">
      <main className="container mx-auto px-8 py-16 max-w-7xl">
        <h1 className="text-4xl font-bold mb-12 text-center">
          Button Component Comparison
        </h1>

        <div className="mb-8 text-center">
          <p className="text-sm text-gray-600 mb-3 font-medium">
            Select Theme:
          </p>
          <div className="flex justify-center space-x-4">
            {(["base", "default", "dark", "light"] as ThemeType[]).map(
              (themeOption) => (
                <button
                  key={themeOption}
                  onClick={() => handleThemeChange(themeOption as ThemeType)}
                  className={`px-4 py-2 rounded ${
                    theme === themeOption
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {themeOption.charAt(0).toUpperCase() + themeOption.slice(1)}
                </button>
              )
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-12">
          {/* Button (Linaria) */}
          <div className="border border-gray-200 rounded-lg p-8">
            <h2 className="text-2xl font-semibold mb-6 text-gray-900 border-b pb-3">
              Button (Linaria)
            </h2>

            <div className="space-y-6">
              <div>
                <p className="text-sm text-gray-600 mb-3 font-medium">
                  Small Size:
                </p>
                <Button
                  sizeType="small"
                  onClick={() => alert("Button small clicked!")}
                >
                  Small Button
                </Button>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-3 font-medium">
                  Medium Size:
                </p>
                <Button
                  sizeType="default"
                  onClick={() => alert("Button medium clicked!")}
                >
                  Medium Button
                </Button>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-3 font-medium">
                  Large Size:
                </p>
                <Button
                  sizeType="large"
                  onClick={() => alert("Button large clicked!")}
                >
                  Large Button
                </Button>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-3 font-medium">
                  Secondary Style:
                </p>
                <Button
                  sizeType="large"
                  styleType="secondary"
                  onClick={() => alert("Button secondary clicked!")}
                >
                  Secondary Button
                </Button>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-3 font-medium">
                  Danger Style:
                </p>
                <Button
                  sizeType="large"
                  danger
                  onClick={() => alert("Button danger clicked!")}
                >
                  Danger Button
                </Button>
              </div>
            </div>
          </div>

          {/* Button V1 (styled-components) */}
          <div className="border border-gray-200 rounded-lg p-8">
            <h2 className="text-2xl font-semibold mb-6 text-gray-900 border-b pb-3">
              Button V1 (styled-components)
            </h2>

            <div className="space-y-6">
              <div>
                <p className="text-sm text-gray-600 mb-3 font-medium">
                  Small Size:
                </p>
                <ButtonV1
                  sizeType="small"
                  onClick={() => alert("ButtonV1 small clicked!")}
                >
                  Small Button
                </ButtonV1>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-3 font-medium">
                  Medium Size:
                </p>
                <ButtonV1
                  sizeType="default"
                  onClick={() => alert("ButtonV1 medium clicked!")}
                >
                  Medium Button
                </ButtonV1>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-3 font-medium">
                  Large Size:
                </p>
                <ButtonV1
                  sizeType="large"
                  onClick={() => alert("ButtonV1 large clicked!")}
                >
                  Large Button
                </ButtonV1>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-3 font-medium">
                  Secondary Style:
                </p>
                <ButtonV1
                  sizeType="default"
                  styleType="secondary"
                  onClick={() => alert("ButtonV1 secondary clicked!")}
                >
                  Secondary Button
                </ButtonV1>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-3 font-medium">
                  Danger Style:
                </p>
                <ButtonV1
                  sizeType="default"
                  danger
                  onClick={() => alert("ButtonV1 danger clicked!")}
                >
                  Danger Button
                </ButtonV1>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
