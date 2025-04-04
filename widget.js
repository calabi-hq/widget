;(async function () {
  const scriptTag = document.currentScript
  const producerSlug = scriptTag.getAttribute('data-producer')
  if (!producerSlug) return

  const defaultConfig = {
    position: 'top-right',
    size: 'medium',
    color: '#00b84a',
    style: 'default',
  }

  let config = defaultConfig

  try {
    const res = await fetch(`https://api.calabi.app/public/widget/${producerSlug}`)
    const json = await res.json()
    if (json && typeof json === 'object') {
      config = { ...defaultConfig, ...json } // merge with fallback
    }
  } catch (err) {
    console.warn('Calabi widget config fallback:', err)
  }

  const widget = document.createElement('div')
  widget.style.position = 'fixed'
  widget.style[config.position.includes('top') ? 'top' : 'bottom'] = '16px'
  widget.style.right = '16px'
  widget.style.zIndex = '9999'
  widget.style.cursor = 'pointer'

  const icon = document.createElement('div')
  icon.style.width = '48px'
  icon.style.height = '48px'
  icon.style.borderRadius = '9999px'
  icon.style.backgroundColor = config.color || '#00B84A'
  icon.style.boxShadow = '0 2px 8px rgba(0,0,0,0.15)'
  icon.style.display = 'flex'
  icon.style.alignItems = 'center'
  icon.style.justifyContent = 'center'

  // SVG icon element
  const svgNS = 'http://www.w3.org/2000/svg'
  const svg = document.createElementNS(svgNS, 'svg')
  svg.setAttribute('viewBox', '0 0 25 25')
  svg.setAttribute('fill', 'none')
  svg.setAttribute('width', '24')
  svg.setAttribute('height', '24')

  const path = document.createElementNS(svgNS, 'path')
  path.setAttribute(
    'd',
    'M4.17163 1.00858C4.30497 1.01879 4.4908 1.04477 4.68984 1.13573C4.95155 1.25533 5.17333 1.44769 5.32874 1.68985C5.44695 1.87403 5.49894 2.05432 5.5279 2.18487C5.5525 2.29575 5.57045 2.42175 5.58515 2.52494C5.58614 2.53189 5.58711 2.53873 5.58807 2.54545L5.93872 5.00001L21.5597 5C21.7018 4.99995 21.8657 4.9999 22.0079 5.01229C22.1678 5.02624 22.4081 5.06244 22.6511 5.20406C22.9582 5.38306 23.1918 5.66532 23.3102 6.00052C23.4038 6.26571 23.3944 6.50852 23.3782 6.66825C23.3638 6.81024 23.333 6.97125 23.3064 7.11082L21.9714 14.1194C21.8887 14.5537 21.8166 14.9323 21.7329 15.2435C21.6438 15.5749 21.5249 15.8978 21.3159 16.2013C21.0003 16.6598 20.5633 17.0213 20.0539 17.2456C19.7167 17.3941 19.3772 17.4505 19.035 17.476C18.7136 17.5 18.3282 17.5 17.8861 17.5H9.25873C8.79386 17.5 8.38978 17.5 8.05391 17.4742C7.69707 17.4468 7.34288 17.3864 6.99387 17.2261C6.46847 16.9847 6.02401 16.5966 5.71399 16.1085C5.50806 15.7843 5.40043 15.4415 5.32517 15.0916C5.25433 14.7623 5.19987 14.3619 5.13722 13.9013L4.08101 6.13812L3.6327 3.00001H2.5C1.94772 3.00001 1.5 2.5523 1.5 2.00001C1.5 1.44773 1.94772 1.00001 2.5 1.00001H3.80616C3.81296 1.00001 3.81987 1.00001 3.82688 1.00001C3.93112 0.999965 4.05839 0.999915 4.17163 1.00858ZM6.2167 7.00001L7.11419 13.5966C7.183 14.1023 7.2277 14.4258 7.28045 14.671C7.33057 14.904 7.37359 14.9911 7.40221 15.0362C7.50555 15.1989 7.6537 15.3282 7.82884 15.4087C7.87734 15.431 7.96944 15.4619 8.20706 15.4801C8.45716 15.4993 8.78371 15.5 9.29411 15.5H17.852C18.3381 15.5 18.6481 15.4994 18.886 15.4816C19.1114 15.4648 19.2001 15.4363 19.248 15.4152C19.4178 15.3405 19.5634 15.2199 19.6686 15.0671C19.6983 15.0241 19.7429 14.9422 19.8016 14.724C19.8635 14.4936 19.9222 14.1892 20.0131 13.7117L21.2915 7.00001H6.2167ZM7.5 21C7.5 19.8954 8.39543 19 9.5 19C10.6046 19 11.5 19.8954 11.5 21C11.5 22.1046 10.6046 23 9.5 23C8.39543 23 7.5 22.1046 7.5 21ZM15.5 21C15.5 19.8954 16.3954 19 17.5 19C18.6046 19 19.5 19.8954 19.5 21C19.5 22.1046 18.6046 23 17.5 23C16.3954 23 15.5 22.1046 15.5 21Z'
  )
  path.setAttribute('fill', 'white')
  path.setAttribute('fill-rule', 'evenodd')
  path.setAttribute('clip-rule', 'evenodd')

  svg.appendChild(path)
  icon.appendChild(svg)

  icon.onclick = () => window.open(`https://calabi.shop/${producerSlug}`, '_blank')

  widget.appendChild(icon)
  document.body.appendChild(widget)
})()
