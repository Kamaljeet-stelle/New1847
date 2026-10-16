import { lounges } from '../data/lounges';
import { services } from '../data/services';
import { articles } from '../data/stories';
import type { City, PriceList, Service, ServiceCategory } from '../types/catalog';

export function getLounge(id: string) {
  return lounges.find(lounge => lounge.id === id);
}

export function getService(id: string) {
  return services.find(service => service.id === id);
}

export function getArticle(id: string) {
  return articles.find(article => article.id === id);
}

export function filterLounges(city?: City | 'all') {
  if (!city || city === 'all') {
    return lounges;
  }
  return lounges.filter(lounge => lounge.city === city);
}

export function filterServices(category?: ServiceCategory | 'all') {
  if (!category || category === 'all') {
    return services;
  }
  return services.filter(service => service.category === category);
}

export function servicesForPrice(list: PriceList) {
  return services.filter(service => service.priceList === list);
}

export function signatureServices() {
  return services.filter(service => service.signature);
}

export function newestServices() {
  return services.filter(service => service.newest);
}

export function serviceMeta(service: Service) {
  return `${service.group} · ${service.priceList}`;
}

export function searchServices(query: string) {
  const needle = query.trim().toLowerCase();
  if (!needle) {
    return services;
  }
  return services.filter(service =>
    `${service.name} ${service.group} ${service.summary}`
      .toLowerCase()
      .includes(needle),
  );
}

export function groupsFor(category: ServiceCategory) {
  const names = services
    .filter(service => service.category === category)
    .map(service => service.group);
  return ['All', ...Array.from(new Set(names))];
}
