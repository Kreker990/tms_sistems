const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const generateOrdersPdf = (orders) => {
  console.log(orders)
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument();
    const filePath = `./orders.pdf`;

    const writeStream = fs.createWriteStream(filePath);

    doc.pipe(writeStream);

    writeStream.on('finish', () => {
      resolve(filePath);
    });

    writeStream.on('error', (err) => {
      reject(err);
    });
    doc.registerFont('DejaVuSans', path.join(__dirname, '/', 'fonts', 'DejaVuSans.ttf'));
    doc.font('DejaVuSans');
    let totalSum = 0;
    orders.forEach((order, index) => {
      // Мини хедер с датами и статусом
      doc.fontSize(12).text(`Статус заказа: ${order.statusorder.value}`, { align: 'right' });
      doc.fontSize(12).text(`Дата загрузки: ${order.timeStart}`, { align: 'right' });
      doc.fontSize(12).text(`Дата разгрузки: ${order.timeEnd}`, { align: 'right' }).moveDown(1);

      doc.fontSize(25).text(`Детали заказа ${order.id}`, { align: 'center', }).moveDown(1);

      doc.fontSize(18).text('Информация о водителе:', { underline: true }).moveDown(0.5);
      doc.fontSize(14).text(`Имя водителя: ${order.driver.name}`);
      doc.fontSize(14).text(`Контакты водителя: ${order.driver.contact}`).moveDown(1);

      doc.fontSize(18).text('Информация о менеджере:', { underline: true }).moveDown(0.5);
      doc.fontSize(14).text(`Имя менеджера: ${order.staff.name}`);
      doc.fontSize(14).text(`Контакты менеджера: ${order.staff.contact}`).moveDown(1);

      // Информация о заказе
      doc.fontSize(18).text('Информация о заказе:', { underline: true }).moveDown(0.5);

      doc.fontSize(16).text('Точка отправки:');
      doc.fontSize(14).text(`название: ${order.a.name}`);
      doc.fontSize(14).text(`адрес: ${order.a.address}`);
      doc.fontSize(14).text(`контакты: ${order.a.contact}`).moveDown(0.5);

      doc.fontSize(16).text('Точка доставки:');
      doc.fontSize(14).text(`название: ${order.b.name}`);
      doc.fontSize(14).text(`адрес: ${order.b.address}`);
      doc.fontSize(14).text(`контакты: ${order.b.contact}`).moveDown(1);

      doc.fontSize(14).text(`Комментарий: ${order.comment}`).moveDown(0.5);
      doc.fontSize(14).text(`Цена: ${order.price.toFixed(2)}`).moveDown(0.25);
      doc.fontSize(14).text(`Оплата водителя: ${(order.price / 100 * 80).toFixed(2)}`).moveDown(0.25);

      // Подпись
      doc.fontSize(12).text('Отчет создан:', { align: 'right' });
      doc.fontSize(12).text(new Date().toLocaleDateString(), { align: 'right' });
      totalSum += order.price;
      if (index < orders.length - 1) {
        doc.addPage();
      }
    });
    doc.moveDown(3);
    doc.fontSize(12).text(`Итоговая сумма: ${totalSum.toFixed(2)}`).moveDown(0.25);
    doc.fontSize(12).text(`Оплата водителя: ${(totalSum / 100 * 80).toFixed(2)}`).moveDown(0.25);
    doc.end();
  });
};

module.exports = generateOrdersPdf;