import { Alert, Cat, Dog, Navbar } from "@lifesg/react-design-system";

export default function Page() {
  return (
    <div>
      Page Component
      <Alert type="error">Hello</Alert>
      <Navbar items={{ desktop: [] }} />
      <Cat type="tabby" />
      <Cat type="siamese" size="small" />
      <Dog type="husky" />
      <Dog type="poodle" style={{ height: 100, width: 180 }} />
    </div>
  );
}
