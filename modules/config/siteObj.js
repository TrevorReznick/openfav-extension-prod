export const siteObj = {
    /* Frontend data */
    user_id: null,//
    name: null,//
    environment: null,
    
    /* Backend data */
    AI: null,//
    AI_summary: null,
    AI_think: null,//
    accessible: null,//
    author: null,
    canonical: null,
    description: null,//
    domain: null,
    domain_exists: null,//
    html_content_exists: null,//
    icon: null,  
    image: null,
    keywords: null,
    logo: null,
    ratings: null,
    redirect_exists: null,//
    secure: null,//
    status_code: null,
    id_area: null,//
    id_cat: null,//
    id_provider: null,
    id_sub_cat: null,
    tag_3: null,//
    tag_4: null,//
    tag_5: null,//
    title: null,//
    type: null,//
    url: null,//
    valid_url: null//

}

// Definisci un mapping per le proprietà che richiedono trasformazioni o hanno nomi diversi
export const propertyMap = {
    environment: 'enviroment',
    AI: 'AI', // Converti in booleano//
    AI_summary: 'AI_summary',
    AI_think: 'my_string',//
    accessible: 'accessible',//
    author: 'author',
    canonical: 'canonical',
    description: 'description',//
    domain_exists: 'domain_exists',//
    domain: 'domain',
    html_content_exists: 'html_content_exists',//
    icon: 'icon',  
    image: 'image',
    keywords: 'keywords',
    logo: 'logo',
    ratings: 'ratings',
    redirect_exists: 'redirect_exists',//
    secure: 'secure',//
    status_code: 'status_code',
    id_area: 'tag_1.id',//
    id_cat: 'tag_2.id',//
    id_sub_cat: 'id_sub_cat',
    id_provider: 'id_provider',
    tag_3: 'tag_3.id',//
    tag_4: 'tag_4.id',//
    tag_5: 'tag_5.id',//
    name: 'name',//   
    type: 'type',//    
    title: 'title',//
    url: 'url', // Se 'url' è già presente in aiResponse
    user_id: 'user_id',//
    valid_url: 'valid_url'//
}

export const keyMappings = {
    accessible: 'accessible',
    AI: (source) => source['AI'] ? true : false,
    AI_think: 'my_string',
    description: 'description',
    domain_exists: 'domain_exists',
    html_content_exists: 'html_content_exists',
    id_area: (source) => source['tag_1']?.id,
    id_cat: (source) => source['tag_2']?.id,
    name: 'name',
    redirect_exists: 'redirect_exists',
    secure: 'secure',
    status_code: 'status_code',
    type: (source) => source['type'],
    tag_3: (source) => source['tag_3']?.id,
    tag_4: (source) => source['tag_4']?.id,
    tag_5: (source) => source['tag_5']?.id,
    title: 'title',
    url: (_, __, url) => url, // Usa il terzo parametro (url)
    user_id: (_, user_id) => user_id, // Usa il secondo parametro (user_id)
    valid_url: (source) => source['valid_url'] ? true : false
}