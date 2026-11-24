using Microsoft.Extensions.DependencyInjection;

namespace Jirjirak.Application;

public static class DependencyInjection
{
    public static IServiceCollection AddApplication(this IServiceCollection services)
    {
        // Register application use cases and validators here as the first feature is introduced.
        return services;
    }
}
