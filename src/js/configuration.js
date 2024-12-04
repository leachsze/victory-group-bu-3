const configuration = {
  sliders: {
    newCars: {
      slidesPerView: 4,
      spaceBetween: 12,
      grid: {
        rows: 2,
        fill: 'row',
      },
    },
    mostPopular: {
      slidesPerView: 4,
      spaceBetween: 12,
      grid: {
        rows: 2,
        fill: 'row',
      },
    },
    bannerSwiper: {
      slidesPerView: 1,
      spaceBetween: 30,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
    },
    catalogSwiper: {
      slidesPerView: 4,
      spaceBetween: 12,
      grid: {
        rows: 3,
        fill: 'row',
      },
    },
    carGallerySwiper: {
      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 12,
    },
    carCatalogSwiper: {
      slidesPerView: 4,
      slidesPerGroup: 4,
      spaceBetween: 12,
    },
    howToSwiper: {
      slidesPerView: 1,
      slidesPerGroup: 1,
      spaceBetween: 12,
    },
    contactsGallerySwiper: {
      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 12,
    },
    allFeedbacksSwiper: {
      slidesPerView: 3,
      spaceBetween: 12,
      grid: {
        rows: 2,
        fill: 'row',
      },
    },
    compireSwiper: {
      slidesPerView: 4,
      spaceBetween: 12,
      navigation: {
        enabled: true,
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
        lockClass: 'swiper-hide-pagination',
      },
    },
  },
  marksListRoute: 'https://bu-3.vitmp.ru/ajax/used_auto/get/marks/all',
  timerDate: '2024/09/29',
  filterSlugs: {
    1: {
      slug: 'chery',
      models: {
        50: {
          slug: 'tiggo-8',
        },
        120: {
          slug: 'tiggo-8-pro',
        },
        123: {
          slug: 'tiggo-4',
        },
        210: {
          slug: 'tiggo-7-pro',
        },
        357: {
          slug: 'tiggo-7',
        },
        385: {
          slug: 'tiggo-2',
        },
        394: {
          slug: 'tiggo-3',
        },
        456: {
          slug: 'tiggo-t11',
        },
        503: {
          slug: 'tiggo-4-pro',
        },
      },
    },
    6: {
      slug: 'mazda',
      models: {
        21: {
          slug: 'cx-5',
        },
        65: {
          slug: '6',
        },
        110: {
          slug: '3',
        },
        240: {
          slug: 'cx-7',
        },
      },
    },
    8: {
      slug: 'mitsubishi',
      models: {
        8: {
          slug: 'outlander',
        },
        76: {
          slug: 'pajero',
        },
        98: {
          slug: 'pajero-sport',
        },
        229: {
          slug: 'asx',
        },
      },
    },
    9: {
      slug: 'kia',
      models: {
        9: {
          slug: 'ceed',
        },
        33: {
          slug: 'soul',
        },
        58: {
          slug: 'sportage',
        },
        69: {
          slug: 'optima',
        },
        106: {
          slug: 'rio',
        },
        137: {
          slug: 'picanto',
        },
        157: {
          slug: 'cerato',
        },
        211: {
          slug: 'sorento',
        },
        245: {
          slug: 'seltos',
        },
      },
    },
    10: {
      slug: 'volkswagen',
      models: {
        10: {
          slug: 'tiguan',
        },
        139: {
          slug: 'polo',
        },
        149: {
          slug: 'golf',
        },
        171: {
          slug: 'passat-cc',
        },
        180: {
          slug: 'passat',
        },
        214: {
          slug: 'jetta',
        },
      },
    },
    12: {
      slug: 'volvo',
      models: {
        13: {
          slug: 'xc60',
        },
        83: {
          slug: 'xc90',
        },
        91: {
          slug: 's80',
        },
        165: {
          slug: 's60',
        },
      },
    },
    16: {
      slug: 'hyundai',
      models: {
        19: {
          slug: 'sonata',
        },
        39: {
          slug: 'i30',
        },
        54: {
          slug: 'elantra',
        },
        61: {
          slug: 'santa-fe',
        },
        62: {
          slug: 'solaris',
        },
        67: {
          slug: 'creta',
        },
        86: {
          slug: 'ix35',
        },
        126: {
          slug: 'tucson',
        },
        279: {
          slug: 'i40',
        },
      },
    },
    17: {
      slug: 'subaru',
      models: {
        20: {
          slug: 'forester',
        },
        166: {
          slug: 'impreza',
        },
        382: {
          slug: 'outback',
        },
      },
    },
    18: {
      slug: 'nissan',
      models: {
        24: {
          slug: 'x-trail',
        },
        44: {
          slug: 'pathfinder',
        },
        46: {
          slug: 'murano',
        },
        66: {
          slug: 'teana',
        },
        95: {
          slug: 'qashqai',
        },
        97: {
          slug: 'juke',
        },
        135: {
          slug: 'tiida',
        },
        291: {
          slug: 'note',
        },
        320: {
          slug: 'sentra',
        },
        322: {
          slug: 'terrano',
        },
        326: {
          slug: 'almera',
        },
        404: {
          slug: 'qashqai-2',
        },
      },
    },
    19: {
      slug: 'ford',
      models: {
        26: {
          slug: 'kuga',
        },
        57: {
          slug: 'focus',
        },
        134: {
          slug: 'ecosport',
        },
        148: {
          slug: 'mondeo',
        },
        362: {
          slug: 'fiesta',
        },
        424: {
          slug: 'fusion',
        },
      },
    },
    20: {
      slug: 'opel',
      models: {
        27: {
          slug: 'astra',
        },
        113: {
          slug: 'insignia',
        },
        131: {
          slug: 'antara',
        },
        262: {
          slug: 'mokka',
        },
      },
    },
    22: {
      slug: 'skoda',
      models: {
        29: {
          slug: 'yeti',
        },
        37: {
          slug: 'superb',
        },
        43: {
          slug: 'kodiaq',
        },
        73: {
          slug: 'rapid',
        },
        117: {
          slug: 'octavia',
        },
        145: {
          slug: 'karoq',
        },
        225: {
          slug: 'fabia',
        },
      },
    },
    23: {
      slug: 'geely',
      models: {
        93: {
          slug: 'atlas',
        },
        136: {
          slug: 'coolray',
        },
        407: {
          slug: 'emgrand-x7',
        },
      },
    },
    26: {
      slug: 'suzuki',
      models: {
        45: {
          slug: 'vitara',
        },
        142: {
          slug: 'sx4',
        },
        152: {
          slug: 'grand-vitara',
        },
        234: {
          slug: 'jimny',
        },
      },
    },
    28: {
      slug: 'haval',
      models: {
        205: {
          slug: 'jolion',
        },
        227: {
          slug: 'h6',
        },
        386: {
          slug: 'h2',
        },
      },
    },
    29: {
      slug: 'ssangyong',
      models: {
        52: {
          slug: 'kyron',
        },
        246: {
          slug: 'rexton',
        },
        317: {
          slug: 'actyon',
        },
      },
    },
    37: {
      slug: 'changan',
      models: {
        331: {
          slug: 'cs35',
        },
        387: {
          slug: 'cs35plus',
        },
      },
    },
    38: {
      slug: 'chevrolet',
      models: {
        161: {
          slug: 'spark',
        },
        178: {
          slug: 'captiva',
        },
        203: {
          slug: 'cruze',
        },
        215: {
          slug: 'lacetti',
        },
        243: {
          slug: 'malibu',
        },
        250: {
          slug: 'aveo',
        },
        435: {
          slug: 'cobalt',
        },
        440: {
          slug: 'epica',
        },
      },
    },
    40: {
      slug: 'toyota',
      models: {
        108: {
          slug: 'camry',
        },
        109: {
          slug: 'rav4',
        },
        143: {
          slug: 'corolla',
        },
        144: {
          slug: 'auris',
        },
        288: {
          slug: 'highlander',
        },
        333: {
          slug: 'avensis',
        },
      },
    },
    41: {
      slug: 'lada',
      models: {
        111: {
          slug: 'xray',
        },
        133: {
          slug: 'vesta',
        },
        153: {
          slug: 'largus',
        },
        155: {
          slug: 'granta',
        },
        241: {
          slug: 'kalina',
        },
        359: {
          slug: 'niva',
        },
        371: {
          slug: '2121-4x4',
        },
        477: {
          slug: 'niva-legend',
        },
        649: {
          slug: '2131-4x4',
        },
      },
    },
    42: {
      slug: 'peugeot',
      models: {
        112: {
          slug: '3008',
        },
        172: {
          slug: '308',
        },
        228: {
          slug: '508',
        },
        316: {
          slug: '4008',
        },
        328: {
          slug: '408',
        },
        337: {
          slug: '208',
        },
      },
    },
    43: {
      slug: 'renault',
      models: {
        114: {
          slug: 'kaptur',
        },
        129: {
          slug: 'arkana',
        },
        130: {
          slug: 'duster',
        },
        147: {
          slug: 'sandero',
        },
        150: {
          slug: 'logan',
        },
        191: {
          slug: 'megane',
        },
        239: {
          slug: 'koleos',
        },
      },
    },
    45: {
      slug: 'honda',
      models: {
        122: {
          slug: 'cr-v',
        },
        160: {
          slug: 'civic',
        },
        264: {
          slug: 'accord',
        },
        565: {
          slug: 'jazz',
        },
        679: {
          slug: 'pilot',
        },
      },
    },
    46: {
      slug: 'uaz',
      models: {
        132: {
          slug: 'patriot',
        },
      },
    },
    47: {
      slug: 'great-wall',
      models: {
        461: {
          slug: 'hover-h3',
        },
        700: {
          slug: 'hover-h5',
        },
      },
    },
    50: {
      slug: 'seat',
      models: {
        176: {
          slug: 'leon',
        },
        281: {
          slug: 'ibiza',
        },
      },
    },
    51: {
      slug: 'daewoo',
      models: {
        467: {
          slug: 'gentra',
        },
      },
    },
    54: {
      slug: 'lifan',
      models: {
        209: {
          slug: 'x50',
        },
        283: {
          slug: 'x60',
        },
        375: {
          slug: 'solano',
        },
        436: {
          slug: 'x70',
        },
      },
    },
    60: {
      slug: 'datsun',
      models: {
        354: {
          slug: 'on-do',
        },
      },
    },
    63: {
      slug: 'ravon',
      models: {
        372: {
          slug: 'r2',
        },
        437: {
          slug: 'r4',
        },
      },
    },
    71: {
      slug: 'faw',
      models: {
        449: {
          slug: 'besturn-x80',
        },
        603: {
          slug: 'besturn-x40',
        },
      },
    },
  },
};

export default configuration;
