"use client";

import { Button } from "storybook-linaria/button";
import { ButtonV1 } from "storybook-linaria/button-v1";
import "storybook-linaria/button/styles.css";

export default function Home() {
  return (
    <div className="min-h-screen bg-white font-sans">
      <main className="container mx-auto px-8 py-16 max-w-7xl">
        <h1 className="text-4xl font-bold mb-12 text-center">
          Button Component Comparison
        </h1>

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
                  sizeType="medium"
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
                  sizeType="medium"
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
                  sizeType="medium"
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
                  sizeType="medium"
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
                  sizeType="medium"
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
                  sizeType="medium"
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
