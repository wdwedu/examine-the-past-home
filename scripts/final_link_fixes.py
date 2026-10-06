from pathlib import Path

# Homepage: replace two old dead fragment links without touching visual layout.
p=Path("index.html")
s=p.read_text(encoding="utf-8",errors="ignore")
s=s.replace('href="#current-events"','href="current-events/"')
s=s.replace('href="#faq"','href="faq/"')
p.write_text(s,encoding="utf-8")

# Games footer: keep design, update destinations that no longer exist as homepage anchors.
p=Path("games/assets/footer.html")
s=p.read_text(encoding="utf-8",errors="ignore")
s=s.replace('/examine-the-past-home/#current-events','/examine-the-past-home/current-events/')
s=s.replace('/examine-the-past-home/#faq','/examine-the-past-home/faq/')
s=s.replace('/examine-the-past-home/#careers','/examine-the-past-home/careers/')
s=s.replace('/examine-the-past-home/#licensing','/examine-the-past-home/licensing/')
s=s.replace('/examine-the-past-home/#copyright','/examine-the-past-home/copyright/')
s=s.replace('/examine-the-past-home/#refund','/examine-the-past-home/refund/')
s=s.replace('/examine-the-past-home/#contact','/examine-the-past-home/#contact-section')
p.write_text(s,encoding="utf-8")

def legal_page(title,kicker,body):
    return f'''<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>{title} | Examine the Past</title><link rel="stylesheet" href="../assets/site-shell.css?v=47"><link rel="stylesheet" href="../assets/etp-section.css"></head><body><main class="wrap"><section class="hero"><div class="eyebrow">{kicker}</div><h1>{title}</h1><p>{body}</p></section><section class="block"><p>{body}</p><p>For questions or notices, use the Contact Us area on the Examine the Past homepage.</p></section></main><script src="../assets/site-shell.js?v=47" data-etp-root="../"></script></body></html>'''

Path("copyright").mkdir(exist_ok=True)
Path("copyright/index.html").write_text(legal_page("Copyright Policy","Legal & Site","Original Examine the Past text, interactive systems, graphics, games, downloads, and branded materials are protected by applicable intellectual-property law. Public-domain and third-party materials should be credited and used according to their source terms. Unauthorized resale, republication, or redistribution of original materials is not permitted except where a specific license allows it."),encoding="utf-8")

Path("refund").mkdir(exist_ok=True)
Path("refund/index.html").write_text(legal_page("Refund / Digital Products","Legal & Site","Digital products are generally governed by the terms stated at purchase. If a file is defective, inaccessible, duplicated, or materially different from the description, the purchase should be reviewed using the applicable store or payment-provider process. This general policy does not override rights provided by law or a marketplace's required terms."),encoding="utf-8")

print("Applied final link corrections.")
