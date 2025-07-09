using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EmailServiceApplication.Interfaces;
using QRCoder;
using QuestPDF.Fluent;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;



namespace EmailServiceInfrastructure.Services
{
    public class PdfGenerator : IPdfGenerator
    {
        public byte[] GenerateTicketPdf(string passengerName, string flightNumber, string bookingCode)
        {
            byte[] qrBytes;
            using (var qrGenerator = new QRCodeGenerator())
            using (var qrData = qrGenerator.CreateQrCode(bookingCode, QRCodeGenerator.ECCLevel.Q))
            using (var qrCode = new PngByteQRCode(qrData))
            {
                qrBytes = qrCode.GetGraphic(20);
            }

            return Document.Create(container =>
            {
                container.Page(page =>
                {
                    page.Size(PageSizes.A4);
                    page.Margin(1.5f, Unit.Centimetre);

                    page.Header().Row(row =>
                    {
                        row.RelativeItem().AlignLeft().Text("KiFly").FontSize(24).Bold().FontColor(Colors.Blue.Darken3);
                        row.RelativeItem().AlignRight().Column(col =>
                        {
                            col.Item().Text("E-TICKET").FontSize(16).SemiBold();
                            col.Item().Text($"ISSUED: {DateTime.Now:dd MMM yyyy HH:mm}").FontSize(8);
                        });
                    });

                    page.Content().PaddingVertical(10).Column(column =>
                    {
                        column.Item().Background(Colors.Grey.Lighten3).Padding(10).Column(col =>
                        {
                            col.Item().Text("PASSENGER").FontSize(10).FontColor(Colors.Grey.Darken2);
                            col.Item().Text(passengerName.ToUpper()).FontSize(18).Bold();
                        });

                        column.Item().PaddingTop(10).Grid(grid =>
                        {
                            grid.VerticalSpacing(8);
                            grid.HorizontalSpacing(15);
                            grid.Columns(4);

                            grid.Item().Column(c =>
                            {
                                c.Item().Text("FLIGHT").FontSize(10).FontColor(Colors.Grey.Darken2);
                                c.Item().Text(flightNumber).FontSize(14).Bold();
                            });

                            grid.Item().Column(c =>
                            {
                                c.Item().Text("BOOKING REF").FontSize(10).FontColor(Colors.Grey.Darken2);
                                c.Item().Text(bookingCode).FontSize(14).Bold();
                            });

                            grid.Item().Column(c =>
                            {
                                c.Item().Text("DEPARTURE").FontSize(10).FontColor(Colors.Grey.Darken2);
                                c.Item().Text($"{DateTime.Now.AddDays(7):dd MMM yyyy}\n10:45 AM").FontSize(12);
                            });

                            grid.Item().Column(c =>
                            {
                                c.Item().Text("TOTAL AMOUNT").FontSize(10).FontColor(Colors.Grey.Darken2);
                                c.Item().Text("€249.99").FontSize(14).Bold().FontColor(Colors.Green.Darken2);
                            });
                        });

                        column.Item().PaddingTop(15).Background(Colors.Blue.Lighten5).Padding(10).Column(route =>
                        {
                            route.Item().Row(r =>
                            {
                                r.RelativeItem().Column(c =>
                                {
                                    c.Item().Text("FROM").FontSize(10);
                                    c.Item().Text("ZAGREB (ZAG)").FontSize(14).Bold();
                                    c.Item().Text("Terminal 1").FontSize(10);
                                });

                                r.ConstantItem(40).AlignCenter().PaddingTop(10).Text("→").FontSize(16);

                                r.RelativeItem().Column(c =>
                                {
                                    c.Item().Text("TO").FontSize(10);
                                    c.Item().Text("PARIS (CDG)").FontSize(14).Bold();
                                    c.Item().Text("Terminal 2F").FontSize(10);
                                });
                            });
                        });

                        column.Item().PaddingTop(10).Grid(priceGrid =>
                        {
                            priceGrid.Columns(2);
                            priceGrid.VerticalSpacing(5);

                            priceGrid.Item().Text("FARE").FontSize(10);
                            priceGrid.Item().AlignRight().Text("€199.00").FontSize(10);

                            priceGrid.Item().Text("TAXES & FEES").FontSize(10);
                            priceGrid.Item().AlignRight().Text("€50.99").FontSize(10);

                            priceGrid.Item().BorderTop(1).PaddingTop(5).Text("TOTAL").FontSize(11).SemiBold();
                            priceGrid.Item().BorderTop(1).PaddingTop(5).AlignRight().Text("€249.99").FontSize(11).SemiBold();
                        });

                        column.Item().PaddingTop(15).AlignCenter().Column(qrColumn =>
                        {
                            qrColumn.Item().Text("BOARDING PASS").FontSize(10).FontColor(Colors.Grey.Darken2);
                            qrColumn.Item().Width(120).Image(qrBytes);
                            qrColumn.Item().PaddingTop(3).Text("Scan at airport security").FontSize(8);
                        });
                    });

                    page.Footer().BorderTop(1).PaddingTop(5).Column(col =>
                    {
                        col.Item().Row(row =>
                        {
                            row.RelativeItem().Text("Need help? contact@flynow.com").FontSize(8);
                            row.RelativeItem().AlignRight().Text("Ticket ID: ZX-2024-98765").FontSize(8);
                        });
                        col.Item().PaddingTop(3).AlignCenter().Text(text =>
                        {
                            text.Span("Non-refundable • ").FontSize(7);
                            text.Span("Baggage allowance: 1 cabin + 1 checked (23kg)").FontSize(7).FontColor(Colors.Blue.Darken1);
                        });
                    });
                });
            }).GeneratePdf();
        }
    }
}