import Dialog from '@/components/dialog/Dialog';
import { ExclamationTriangleIcon } from '@heroicons/react/20/solid';
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';

const noop = () => {};

const defaultProps = {
  title: 'Test Title',
  description: 'Test Description',
  ctaLabel: 'Test CTA',
  open: true,
  onClose: noop,
  onConfirm: noop,
  onCancel: noop,
};

describe('Dialog component', () => {
  it('should render all required parts', async () => {
    await act(() => {
      render(<Dialog {...defaultProps} />);
    });
    expect(screen.getByTestId('dialog')).toBeInTheDocument();
    expect(screen.queryByTestId('dialog-icon')).toBeNull();
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(screen.getByText('Test CTA')).toBeInTheDocument();
    expect(screen.getByText('Test CTA')).toHaveRole('button');
    expect(screen.getByText('Cancel')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toHaveRole('button');
  });

  it('should render the icon if provided', async () => {
    await act(() => {
      render(<Dialog {...defaultProps} icon={<ExclamationTriangleIcon />} />);
    });
    expect(screen.getByTestId('dialog')).toBeInTheDocument();
    expect(screen.getByTestId('dialog-icon')).toBeInTheDocument();
  });

  it('should not show the dialog when open is false', async () => {
    await act(() => {
      render(<Dialog {...defaultProps} open={false} />);
    });
    expect(screen.queryByTestId('dialog')).toBeNull();
  });

  describe('should call onClose', () => {
    it('when dialog is closed using keyboard', async () => {
      const onClose = jest.fn();
      await act(() => {
        render(<Dialog {...defaultProps} onClose={onClose} />);
      });
      act(() => {
        fireEvent.keyDown(screen.getByTestId('dialog'), {
          key: 'Escape',
          code: 'Escape',
        });
      });
      expect(onClose).toHaveBeenCalled();
    });
    it.skip('when dialog is dismissed', async () => {
      const onClose = jest.fn();
      await act(() => {
        render(<Dialog {...defaultProps} onClose={onClose} />);
      });

      fireEvent.click(screen.getByText('Cancel'));

      expect(onClose).toHaveBeenCalled();
    });
  });

  it('should call onConfirm when confirm button is clicked', async () => {
    const onConfirm = jest.fn();
    await act(() => {
      render(
        <Dialog {...defaultProps} ctaLabel="Confirm" onConfirm={onConfirm} />
      );
    });
    fireEvent.click(screen.getByText('Confirm'));
    expect(onConfirm).toHaveBeenCalled();
  });

  it('should call onCancel when cancel button is clicked', async () => {
    const onCancel = jest.fn();
    await act(() => {
      render(<Dialog {...defaultProps} onCancel={onCancel} />);
    });
    fireEvent.click(screen.getByText('Cancel'));
    expect(onCancel).toHaveBeenCalled();
  });
});
