# frozen_string_literal: true

# Invoices Controller
class InvoicesController < ApplicationController
  def index
    @invoices = Invoice.all
    render json: @invoices
  end

  def show
    @invoice = Invoice.find(params[:id])
    render json: @invoice
  end

  def create
    @invoice = Invoice.new(invoice_params)
    if @invoice.save
      render json: @invoice
    else
      render json: { error: 'Error creating invoice' }
    end
  end

  def update
    @invoice = Invoice.find(params[:id])
    if @invoice
      @invoice.update(invoice_params)
      render json: { message: 'Invoice successfully updated' }
    else
      render json: { error: 'Error updating invoice' }
    end
  end

  def invoice_params
    params.require(:invoice).permit(:invoice_number, :due_date, :amount, :state)
  end

  def pay
    @invoice = Invoice.find(params[:id])
    if @invoice
      @invoice.pay!
      render json: { message: 'Invoice successfully payed' }
    else
      render json: { error: 'Error paying invoice' }
    end
  end

  def ship
    @invoice = Invoice.find(params[:id])
    if @invoice
      @invoice.ship!
      render json: { message: 'Invoice successfully shipped' }
    else
      render json: { error: 'Error shipping invoice' }
    end
  end

  def void
    @invoice = Invoice.find(params[:id])
    if @invoice
      @invoice.void!
      render json: { message: 'Invoice successfully voided' }
    else
      render json: { error: 'Error voiding invoice' }
    end
  end
end
