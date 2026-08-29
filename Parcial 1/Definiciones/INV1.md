## ¿Qué es una API?

Una API es un conjunto de definiciones, reglas y protocolos que permite que dos componentes o sistemas de software se comuniquen e interactúen entre sí.

* Propósito: Actúa como una capa de abstracción o contrato formal. Especifica qué operaciones están disponibles, qué datos de entrada se requieren y qué respuestas se obtienen.
* Principio clave: Permite a una aplicación consumir la lógica o los datos de otro sistema sin necesidad de conocer los detalles internos de su implementación (principio de caja negra).

* Reutilización y modularidad: Permite desarrollar la lógica de negocio una sola vez y consumirla desde múltiples clientes o plataformas sin duplicar código.

* Interoperabilidad e integración: Facilita la comunicación fluida entre sistemas heterogéneos desarrollados en diferentes lenguajes de programación, arquitecturas o sistemas operativos.

* Bajo acoplamiento y mantenibilidad: Separa la interfaz de la implementación interna. Los desarrolladores pueden modificar o mejorar el código interno sin afectar a las aplicaciones cliente que consumen la API.

* Escalabilidad: Permite desacoplar arquitecturas monolíticas en servicios independientes (microservicios), facilitando el escalado de componentes específicos según la demanda de tráfico.

* Seguridad controlada: Actúa como una barrera de protección. Oculta la infraestructura crítica  y centraliza la autenticación, la autorización y el control de límites de peticiones.

* Velocidad del desarrollo: Permite aprovechar servicios y funcionalidades ya existentes sin necesidad de desarrollarlos desde cero.

## ¿Qué es REST?

REST es un estilo arquitectónico para el diseño de sistemas distribuidos y servicios en red, propuesto por Roy Fielding en el año 2000.

* Naturaleza: No es un protocolo ni un estándar rígido, sino un conjunto de restricciones y principios de diseño que aprovechan la infraestructura nativa de la web (principalmente el protocolo HTTP).
* Principios fundamentales:
  * Orientación a recursos: La información se organiza y modela en recursos únicos identificados por URIs.
  * Stateless: Cada petición del cliente al servidor debe contener toda la información necesaria para procesarse. El servidor no almacena contexto de sesión entre solicitudes.
  * Uso de métodos estándar HTTP: Emplea los verbos HTTP (`GET` para consultar, `POST` para crear, `PUT`/`PATCH` para modificar y `DELETE` para eliminar).
  * Representaciones estándar: Los recursos se transfieren habitualmente en formatos ligeros e interoperables como JSON o XML.
  * Cacheable: Las respuestas se marcan explícitamente para optimizar el rendimiento mediante el uso de caché.

## ¿A qué se refiere el término RESTful?

El término RESTful es un adjetivo que describe a todo servicio web, API o sistema que implementa y cumple rigurosamente con los principios y restricciones de la arquitectura REST.
