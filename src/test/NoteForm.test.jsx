import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import NoteForm from "../components/NoteForm.jsx";

// Solución masterclass 4
describe("NoteForm", () => {
  it("muestra el campo de título y el botón de añadir", () => {
    render(<NoteForm onCreate={vi.fn()} />);
    expect(screen.getByPlaceholderText(/título/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /añadir/i })).toBeInTheDocument();
  });
});
