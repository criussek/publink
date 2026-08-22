const approveButton = document.querySelector('#approve-transfer');
const transferStatus = document.querySelector('#transfer-status');

if (approveButton && transferStatus) {
  approveButton.addEventListener('click', () => {
    approveButton.disabled = true;
    approveButton.classList.add('done');
    approveButton.textContent = 'Szkic utworzony';
    transferStatus.textContent = 'Symulacja: decyzja została zapisana jako szkic do zatwierdzenia przez uprawnioną osobę. Żadna operacja finansowa nie została wykonana.';
  });
}