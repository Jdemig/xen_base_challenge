import App from './App'
import {render, screen} from './utils/test-utils'
import {fireEvent, waitFor} from "@testing-library/react";

describe('Simple working test', () => {
  it('the title is visible', () => {
    render(<App />);
    expect(screen.getByText("Invoice List")).toBeInTheDocument();
  })

  it('the link to an invoice is visible', async () => {
    render(<App />);

    await waitFor(() => expect(screen.getAllByTestId('invoice-link')[0]).toBeInTheDocument());
  });

  it('the link to an invoice is clickable', async () => {
    render(<App />);

    await waitFor(() => expect(screen.getAllByTestId('invoice-link')[0]).toBeInTheDocument());

    fireEvent.click(screen.getAllByTestId('invoice-link')[0]);

    setTimeout(async () => {
      await waitFor(() => expect(screen.getByText("Invoice Details")).toBeInTheDocument());
    }, 0);
  });
});