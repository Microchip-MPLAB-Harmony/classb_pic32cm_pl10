window.onload = function () {
  const permalinks = document.querySelectorAll('.permalink');

  permalinks.forEach((link) => {
    link.title = 'Copy link to clipboard';
  });

  async function copyToClipboard(textToCopy) {
    try {
      await navigator.clipboard.writeText(textToCopy);
      showToast('Link copied');
    } catch (err) {
      fallbackCopy(textToCopy);
      showToast('Link copied');
    }
  }

  function fallbackCopy(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
  }

  function showToast(message) {
    let toast = document.getElementById('custom-toast');

    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'custom-toast';
      document.body.appendChild(toast);
    }

    toast.textContent = message;
    toast.style.opacity = '1';

    clearTimeout(toast._hideTimer);
    toast._hideTimer = setTimeout(() => {
      toast.style.opacity = '0';
    }, 2000);
  }

  document.addEventListener('click', (e) => {
    const permalink = e.target.closest('.permalink');

    if (permalink) {
      setTimeout(async () => {
        const urlToCopy = window.location.href;
        await copyToClipboard(urlToCopy);
      }, 0);
    }
  });
};
